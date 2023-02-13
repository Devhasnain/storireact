import React, { useEffect, useState, useRef } from "react";
import { MobileView } from "react-device-detect";
import {
  Experience,
  Frames,
  Decision,
  Capture,
  RoutateCamIcon,
  Loader,
  Counter,
  GifProgress,
  VideoTimer,
} from "./";
import { useSelector, useDispatch } from "react-redux";
import {
  getStatus,
  setStatus,
  selectScreen,
  selectFrame,
  selectImage,
  selectExperience,
  selectVideoConstraints,
  selectCapturedVideo,
  setLayout,
  selectLayout,
  changeScreen,
  setwebcamprefs,
} from "../studioSlice";
import includes from "lodash/includes";
import Webcam from "react-webcam";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SectionRenderer from "./SectionRenderer";

export const Booth = (props) => {
  const webcamRef = React.useRef(null);
  const [childRefreshFunction, setChildRefreshFunction] = useState(null);
  const screen = useSelector(selectScreen);
  const frame = useSelector(selectFrame);
  const experience = useSelector(selectExperience);
  const status = useSelector(getStatus);
  const capturedImage = useSelector(selectImage);
  const videoConstraints = useSelector(selectVideoConstraints);
  const videoData = useSelector(selectCapturedVideo);
  const captureRef = useRef();
  const dispatch = useDispatch();

  const timesUp = () => {
    if (captureRef.current) {
      captureRef.current.stopCapture("Stop Video capture. its timesUp");
    }
  };

  useEffect(() => {
    dispatch(setStatus("idle"));
  }, []);

  return (
    <div className="screen_content">
      <div className="screen_content_wrap">
        <div
          className="mobile_screen"
          style={{ maxWidth: videoConstraints.width + 50 + "px" }}
        >
          <div className="mobile_screen_wrap">
            <div className="mobile_screen_logo">
              <Header />
              <MobileView>
                <RoutateCamIcon />
              </MobileView>
            </div>
            <div
              className="filter_frame_box_wrape"
              style={{
                height: videoConstraints.height + "px",
                width: videoConstraints.width + "px",
              }}
            >
              {status === "counter" && <Counter />}
              {!capturedImage && !videoData && (
                <Webcam
                  audio={false}
                  height={videoConstraints.height}
                  width={videoConstraints.width}
                  ref={webcamRef}
                  mirrored={true}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  imageSmoothing={true}
                  onUserMedia={() => dispatch(setStatus("idle"))}
                />
              )}
              {status === "loading" && <Loader />}
              {capturedImage && (
                <img src={`${capturedImage}`} alt={experience} />
              )}
              {videoData && (
                <video
                  src={URL.createObjectURL(videoData)}
                  height={videoConstraints.height}
                  width={videoConstraints.width}
                  controls={false}
                  autoPlay
                ></video>
              )}
              {screen !== "experience" && experience !== "video" && (
                <div className="frame_image">
                  <img src={`${frame}`} alt={frame} />
                </div>
              )}
              {status === "videoCapturing" && (
                <VideoTimer initialMinute={2} timeOverEvent={() => timesUp()} />
              )}
            </div>
            {status === "gifCapturing" && <GifProgress />}
            <SectionRenderer
              captureRef={captureRef}
              screen={screen}
              webcamRef={webcamRef}
              videoConstraints={videoConstraints}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
