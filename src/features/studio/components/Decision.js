import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeScreen, selectImage, selectScreen, setDecision } from "../studioSlice";
import { Download } from "./Download";

export const Decision = () => {
  const dispatch = useDispatch();
  const capturedImage = useSelector(selectImage);
  console.log(capturedImage)
  useEffect(()=>{
    if (capturedImage) {
      dispatch( changeScreen("decision"));
    } else {
      dispatch(changeScreen("capture"))
    }
  },[capturedImage])


  return (
    <div className="stori_snap" style={{ marginTop: 10 }}>
      <div className="stori_snap_wrap">
        <div className="decision-btns">
          <div className="snap-btn" style={{ marginTop: 10 }}>
            <button
              style={{ padding: "0px" }}
              className="rouded-jumbo-btn final btn"
              onClick={() => dispatch(setDecision("retake"))}
            >
              <img alt="" src="/images/Reload-White.svg" />
            </button>
            <br />
            <span>Retake</span>
          </div>
          <div className="snap-btn" style={{ marginTop: 10 }}>
            <a
              style={{ padding: "0px" }}
              href={capturedImage}
              download
              className="rouded-jumbo-btn final btn"
            >
              <img alt="" src="/images/download.svg" />
            </a>
            <br />
            <span>Download</span>
          </div>
          <div className="snap-btn" style={{ marginTop: 10 }}>
            <Link
              style={{ padding: "0px" }}
              className="rouded-jumbo-btn final btn"
              to={'/upload'}
            >
              <img alt="" src="/images/Envelope-White.svg" />
            </Link>
            <br />
            <span>Email</span>
          </div>
        </div>
      </div>
    </div>
  );
};
