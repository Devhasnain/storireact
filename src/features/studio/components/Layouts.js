import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeScreen,
  selectLayout,
  setStatus,
} from "../studioSlice";

export const Layouts = () => {
  let layout = useSelector(selectLayout);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeScreen("layouts"));
  }, []);
  return (
    <div className="screen_content screen_frame_layout">
      <div className="screen_content_wrap">
        <div className="frame_heading">
          <h3>Set frame layout</h3>
        </div>
        <div className="frame_layout">
          <div className="frame_layout_wrap">
            <div
              className={`feed_style_layout layout_style ${
                layout === "feed" ? "active" : ""
              }`}
            >
              <Link
                to="/feed"
                onClick={() => {
                  dispatch(setStatus("loading"));
                }}
              >
                <img src="./images/layout_feed_style.svg" alt="Feed Layout" />
                <h5>Feed Style</h5>
              </Link>
            </div>
            <div
              className={`feed_style_layout layout_style ${
                layout === "stori" ? "active" : ""
              }`}
            >
              <Link
                to="/stori"
                onClick={() => {
                  dispatch(setStatus("loading"));
                }}
              >
                <img src="./images/layout_story_style.svg" alt="Stori Layout" />
                <h5>Story Style</h5>
              </Link>
            </div>
            {/* <div className={`feed_style_layout layout_style ${layout === 'laptop' ? "active" : ""}`}>
                            <Link to="" onClick={() => dispatch(setLayout('laptop'))}>
                                <img src="./images/layout_frame_style.svg" alt="Frame Layout" />
                                <h5>Frame Style</h5>
                            </Link>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
