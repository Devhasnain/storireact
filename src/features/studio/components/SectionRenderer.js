import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectExperience, selectScreen, setStatus } from "../studioSlice";
import { Capture } from "./Capture";
import { Decision } from "./Decision";

const SectionRenderer = ({
  captureRef,
  webcamRef,
  videoConstraints,
  screen,
}) => {
  const experience = useSelector(selectExperience);
  const dispatch = useDispatch();
  const PageRenderer = (screen) => {
    switch (screen) {
      case "capture":
        return (
          <Capture
            ref={captureRef}
            webcamRef={webcamRef}
            videoConstraints={videoConstraints}
            startCounter={() => dispatch(setStatus("counter"))}
          />
        );
      case "decision":
        return <Decision />;
      default:
        return <Outlet />;
    }
  };
  return <>{PageRenderer(screen)}</>;
};

export default SectionRenderer;
