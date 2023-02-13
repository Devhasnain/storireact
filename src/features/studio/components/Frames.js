import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-simply-carousel";
import { changeScreen, selectScreen, setFrame } from "../studioSlice";

export const Frames = () => {
  let frames = [
    "./images/frame_1.png",
    "./images/frame_2.png",
    "./images/frame_3.png",
    "./images/frame_4.png",
    "./images/frame_5.png",
    "./images/frame_6.png",
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeScreen("frames"));
  }, []);

  return (
    <div className="stori_frame_box">
      <div className="stori_frame_box_wrap">
        <div className="heading">
          <h4>Select a Frame</h4>
        </div>
      </div>
      <div id="stori_frame_slider" className="stori_frame_slider">
        <Carousel
          updateOnItemClick
          containerProps={{
            style: {
              width: "100%",
              justifyContent: "space-between",
            },
          }}
          activeSlideIndex={activeSlide}
          activeSlideProps={{
            style: {
              borderColor: "#48a0f5",
            },
          }}
          onRequestChange={setActiveSlide}
          itemsToShow={4}
          speed={400}
        >
          {frames.map((item, index) => (
            <div
              style={{
                width: 100,
                height: 100,
                borderWidth: 8,
                borderColor: "white",
                borderStyle: "solid",
                textAlign: "center",
                lineHeight: "100px",
                boxSizing: "border-box",
              }}
              key={index}
              className="frame_slider_box"
              onClick={() => dispatch(setFrame(item))}
            >
              <img src={item} alt={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
