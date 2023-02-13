import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  changeScreen,
  setExperience,
  selectExperience,
} from "../studioSlice";

export const Experience = () => {
  let experience = useSelector(selectExperience);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeScreen("experience"));
  }, []);
  const setExperiences = (type) => {
    if (type !== "video") {
      dispatch(setExperience(type));
    } else {
      dispatch(setExperience(type));
    }
  };

  return (
    <>
      <div className="stori_experience_wrap">
        <div className="heading">
          <h4>Select Your Experience</h4>
        </div>
        <div className="stori_experience_list">
          <NavLink
            to={"/frames"}
            className={`stori_box_wrap ${
              experience === "photo" ? "active" : "active"
            }`}
            onClick={() => setExperiences("photo")}
          >
            <div className="stori_photo stori_box ">
              <img src="./images/Photo.svg" alt="Photo" />
            </div>
            <span>Photo</span>
          </NavLink>

          <div
            className={`stori_box_wrap ${
              experience === "video" ? "active" : "active"
            }`}
            onClick={() => setExperiences("video")}
          >
            <div className="stori_boomrang stori_box ">
              <img src="./images/Boomrang.svg" alt="Boomerang" />
            </div>
            <span>Video</span>
          </div>

          {/* 
                <div className={ `stori_box_wrap ${experience === 'boomerang' ? "active" : ""}`} onClick={() => setExperiences('boomerang')}>
                    <div className="stori_boomrang stori_box ">
                        <img src="./images/Boomrang.svg" alt="Boomerang" />
                    </div>
                    <span>Boomerang</span>
                </div>
                */}

          <NavLink
            to={"/frames"}
            className={`stori_box_wrap ${experience === "GIF" ? "active" : "active"}`}
            onClick={() => setExperiences("GIF")}
          >
            <div className="stori_gif stori_box">
              <img src="./images/gif.svg" alt="GIF" />
            </div>
            <span>GIF</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};
