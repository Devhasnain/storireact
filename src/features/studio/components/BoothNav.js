import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeScreen,
  selectScreen,
  ScreenNames,
  setDecision,
} from "../studioSlice";
import indexOf from "lodash/indexOf";
import { NextButton } from "./";
export const BoothNav = () => {
  const screen = useSelector(selectScreen);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  function prev() {
    if (screen === "experience") {
      navigate("/layouts");
    } else {
      let index = indexOf(ScreenNames, screen);
      let newScreen = ScreenNames[index - 1];
      if (newScreen === "capture") {
        dispatch(setDecision("reset"));
      }
      dispatch(changeScreen(newScreen));
    }
  }

  return (
    <>
      <div className="btn_wrap">
        <button className="btn btn-default btn_back" onClick={prev}>
          Back
        </button>
        <NextButton />
      </div>
    </>
  );
};
