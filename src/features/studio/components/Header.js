import { indexOf } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeScreen,
  getStatus,
  ScreenNames,
  selectScreen,
  setDecision,
  setImage,
} from "../studioSlice";
import { MainLogo } from "./MainLogo";

const Header = () => {
  const status = useSelector(getStatus);
  const screen = useSelector(selectScreen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const next = () => {
    let index = indexOf(ScreenNames, screen);
    let newScreen = ScreenNames[index + 1];
    if (ScreenNames[index + 1] === "experience") {
      navigate(`/${ScreenNames[index + 1]}`);
    } else if (ScreenNames[index] === "frames") {
      dispatch(changeScreen("capture"));
    } else {
      navigate(`/${newScreen}`);
    }
    console.log(newScreen);
    // dispatch(changeScreen(newScreen));
  };

  function prev() {
    let index = indexOf(ScreenNames, screen);
    let newScreen = ScreenNames[index - 1];
    if (screen === "capture") {
      dispatch(setImage(null));
    }
    if (newScreen === "experience") {
      navigate(`/feed`);
    } else if (newScreen === "frames") {
      dispatch(changeScreen("frames"));
    } else {
      navigate(`/${newScreen}`);
    }
  }

  return (
    <>
      <div className="header">
        <span onClick={prev}>
          <img alt="" className="nav-btns" src="/images/back.svg" />
        </span>
        <div>
          <MainLogo />
        </div>
        {screen !== "capture" ? (
          screen !== "decision" ? (
            <span onClick={next} disabled={status == "capturing"}>
              <img alt="" className="nav-btns" src="/images/next.svg" />
            </span>
          ) : (
            <span></span>
          )
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
};

export default Header;
