import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import Webcam from "react-webcam";
import { useSelector, useDispatch } from 'react-redux';
import {  
  selectFrame,
  getStatus,
  selectScreen,
  setImage,
  selectImage,
  selectExperience,
  setStatus
} from '../studioSlice';

import Loader from './Loader';
import includes from 'lodash/includes';
import gifshot from "gifshot";

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

const Camera = forwardRef((props, ref) => {
    
    const screen = useSelector(selectScreen);
    const frame = useSelector(selectFrame);
    const status = useSelector(getStatus);
    const experience = useSelector(selectExperience);

    const dispatch = useDispatch();

    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const capturedImage = useSelector(selectImage);

  
    useImperativeHandle(ref, () => ({
      childMethod() {
        capture()
      }
    }))
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    const capture = React.useCallback(
        () => {
          console.log(experience);
          console.log(experience);
          const imageSrc = webcamRef.current.getScreenshot();
          if(experience == 'photo') {
            createTakeSnap(webcamRef.current.stream);
          } else {
            createGif(webcamRef.current.stream);
          }
        },
        [webcamRef]
    );

    const createTakeSnap = (video) => {
    
      let img = new Image();
      img.src = frame;
      img.onload = () => {

        gifshot.takeSnapShot({
          gifWidth: videoConstraints.width * 2,
          gifHeight: videoConstraints.height * 2,
          interval: 0.15,
          numFrames: 10,
          frameDuration: 1,
          fontWeight: "normal",
          fontSize: "16px",
          fontFamily: "sans-serif",
          fontColor: "#ffffff",
          textAlign: "center",
          textBaseline: "bottom",
          sampleInterval: 10,
          numWorkers: 2,
          // webcamVideoElement: video,
          keepCameraOn: true,
          cameraStream: video,
          waterMark: img,
          // If an image is given here, it will be stamped on top of the GIF frames
          waterMarkHeight: videoConstraints.height * 2,
          // Height of the waterMark
          waterMarkWidth: videoConstraints.width * 2,
          // Height of the waterMark
          waterMarkXCoordinate: 0,
          // The X (horizontal) Coordinate of the watermark image
          waterMarkYCoordinate: 0
          // The Y (vertical) Coordinate of the watermark image
        }, (obj) => {
          if (!obj.error) {
            dispatch(setImage(obj.image));
            dispatch(changeScreen('decision'));
          }
        });
      }
    }

    const createGif = (video) => {
      let img = new Image();
      img.src = frame;
      img.onload = () => {
        gifshot.createGIF(
          {
            gifWidth: videoConstraints.width,
            gifHeight: videoConstraints.height,
            interval: 0.5,
            numFrames: 4,
            frameDuration: 1,
            fontWeight: "normal",
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontColor: "#ffffff",
            textAlign: "center",
            textBaseline: "bottom",
            sampleInterval: 10,
            numWorkers: 2,
            // webcamVideoElement: video,
            keepCameraOn: true,
            cameraStream: video,
            waterMark: img,
            // If an image is given here, it will be stamped on top of the GIF frames
            waterMarkHeight: videoConstraints.height,
            // Height of the waterMark
            waterMarkWidth: videoConstraints.width,
            // Height of the waterMark
            waterMarkXCoordinate: 1,
            // The X (horizontal) Coordinate of the watermark image
            waterMarkYCoordinate: 1
            // The Y (vertical) Coordinate of the watermark image
          },
          (obj) => {
            if (!obj.error) {
              dispatch(setImage(obj.image));
              dispatch(changeScreen('decision'));
            }
          }
        );
      }
    };
    
    return (
        <>
        { !capturedImage && <Webcam
            audio={false}
            height={videoConstraints.height}
            width={videoConstraints.width}
            ref={ref}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
        /> }
        { capturedImage && <img src={`${capturedImage}`} alt={experience} /> }
        {includes(['frame', 'capture'], screen) && 
            <div className="frame_image">
                <img src={`${frame}`} alt={frame} />
            </div>
        }
        </>
    );

});

export default Camera;
