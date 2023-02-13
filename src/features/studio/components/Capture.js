import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFrame,
  setImage,
  setStatus,
  selectExperience,
  setVideoData,
  changeScreen,
  selectCounter,
  selectGifSetting,
  setExperience,
  selectwebcamprefs,
} from "../studioSlice";
import gifshot from "gifshot";
// import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';

export const Capture = forwardRef((props,ref) => {
//   const props = useSelector(selectwebcamprefs);
  // const   = useRef(null);
  const gifSetting = useSelector(selectGifSetting);
  const counterInit = useSelector(selectCounter);
  const frame = useSelector(selectFrame);
  const experience = useSelector(selectExperience);

  const dispatch = useDispatch();
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (recordedChunks.length > 0) {
        console.log("running handleDownload");
        handleDownload();
      }
    }
    dispatch(changeScreen("capture"));
  }, [recordedChunks]);

  //stop capture if times Up

  useImperativeHandle(
    ref,
    () => ({
      stopCapture(msg) {
        console.log("stopCapture");
        console.log(capturing);
        // if(capturing) {
        handleStopCaptureClick();
        // }
      },
    }),
    []
  );

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);

    mediaRecorderRef.current = new MediaRecorder(
      props.webcamRef.current.stream,
      {
        mimeType: "video/webm;codecs=VP8",
      }
    );
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();

    dispatch(setStatus("videoCapturing"));
  }, [props.webcamRef, setCapturing, mediaRecorderRef]);

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
    dispatch(setStatus("loading"));
    // dispatch(changeScreen("decision"));
  }, [mediaRecorderRef, props.webcamRef, setCapturing]);

  // const handleDownload = React.useCallback(() => {
  //     if (recordedChunks.length) {
  //         const blob = new Blob(recordedChunks, {
  //             type: "video/webm;codecs=VP8"
  //         });
  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.style = "display: none";
  //         a.href = url;
  //         a.download = "react-webcam-stream-capture.webm";
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         setRecordedChunks([]);
  //     }
  // }, [recordedChunks]);

  const handleDownload = React.useCallback(() => {
    console.log("inside handler");
    console.log("chunks? ", recordedChunks.length);
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=VP8",
      });
      dispatch(setVideoData(blob));
      setTimeout(() => {
        dispatch(changeScreen("decision"));
        dispatch(setStatus("idle"));
      }, 300);
    }
  }, [recordedChunks]);

  const createTakeSnap = (video) => {
    let img = new Image();
    img.src = frame;
    img.onload = () => {
      gifshot.takeSnapShot(
        {
          gifWidth: props.videoConstraints.width * 2,
          gifHeight: props.videoConstraints.height * 2,
          numWorkers: 2,
          keepCameraOn: true,
          cameraStream: video,
          waterMark: img,
          waterMarkHeight: props.videoConstraints.height * 2,
          waterMarkWidth: props.videoConstraints.width * 2,
          waterMarkXCoordinate: 0,
          waterMarkYCoordinate: 0,
        },
        (obj) => {
          if (!obj.error) {
            let result = obj.image.replace("image/gif", "image/jpeg");
            dispatch(setImage(result));
            dispatch(changeScreen("decision"));
          }
        }
      );
    };
  };

  const createGif = (video) => {
    let img = new Image();
    img.src = frame;
    img.onload = () => {
      dispatch(setStatus("gifCapturing"));
      gifshot.createGIF(
        {
          gifWidth: props.videoConstraints.width,
          gifHeight: props.videoConstraints.height,
          interval: gifSetting.interval,
          numFrames: gifSetting.numFrames,
          frameDuration: 1,
          sampleInterval: 10,
          numWorkers: 2,
          // webcamVideoElement: video,
          keepCameraOn: true,
          cameraStream: video,
          waterMark: img,
          waterMarkHeight: props.videoConstraints.height,
          waterMarkWidth: props.videoConstraints.width,
          waterMarkXCoordinate: 1,
          waterMarkYCoordinate: 1,
        },
        (obj) => {
          if (!obj.error) {
            dispatch(setStatus("idle"));
            dispatch(setImage(obj.image));
            dispatch(changeScreen("decision"));
          }
        }
      );
    };
  };

  const wait = (delayInMS) => {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  };

  const capture = React.useCallback(() => {
    props.startCounter();
    wait(counterInit * 1000).then(() => {
      dispatch(setStatus("idle"));
      console.log("Start Capture");
      console.log(experience);
      if (experience == "photo") {
        // const imageSrc = props.webcamRef.current.getScreenshot();
        // dispatch(setImage(imageSrc));
        // dispatch(changeScreen('decision'));

        createTakeSnap(props.webcamRef.current.stream);
      } else if (experience == "video") {
        if (!capturing) {
          handleStartCaptureClick();
        }
        // else {
        //     handleStopCaptureClick();
        // }
      } else {
        createGif(props.webcamRef.current.stream);
      }
    });
  }, [props.webcamRef, experience, capturing]);

  const onChangeFile = (e) => {
    let file = e.target.files[0];

    // //Get the file Extension
    // var fileExtension = file.name.split('.').pop();
    // alert(fileExtension);

    if (file.type.includes("video")) {
      dispatch(setExperience("video"));
      dispatch(setStatus("idle"));
      dispatch(setVideoData(file));
      dispatch(changeScreen("decision"));
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setExperience("photo"));
        dispatch(setStatus("idle"));
        dispatch(setImage(reader.result));
        dispatch(changeScreen("decision"));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="stori_snap">
      <div className="stori_snap_wrap">
        <div className="heading">
          {experience === "photo" && <h4>Take a selfie!</h4>}
          {experience === "video" && <h4>Take a video !</h4>}
          {experience === "GIF" && <h4>Take a Gif!</h4>}
        </div>
        <div className="snap-btn">
          {experience != "video" && (
            <button
              style={{ padding: "0px" }}
              className="rouded-jumbo-btn btn btn-danger"
              onClick={capture}
            >
              SNAP
            </button>
          )}
          {experience == "video" && !capturing && (
            <button
              style={{ padding: "0px" }}
              className="rouded-jumbo-btn btn btn-danger"
              onClick={capture}
            >
              Start
            </button>
          )}
          {experience == "video" && capturing && (
            <button
              style={{ padding: "0px" }}
              className="rouded-jumbo-btn btn btn-danger"
              onClick={handleStopCaptureClick}
            >
              Stop
            </button>
          )}
          <div className="upload_link">
            <span>or </span>
            <label htmlFor="upload-photo">
              upload an image <img src="images/upload.svg" alt="Upload" />
            </label>
            <input
              accept="image/*,video/*"
              type="file"
              name="photo"
              id="upload-photo"
              multiple={ false }
              onChange={onChangeFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
