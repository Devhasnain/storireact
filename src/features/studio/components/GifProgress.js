import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatus, selectGifSetting, getStatus } from "../studioSlice";

export const GifProgress = (props) => {
  const shutterSound = new Audio();
  shutterSound.src = "./sound/camera-shutter-click-01.mp3";
  shutterSound.load();

  const gifSetting = useSelector(selectGifSetting);
  const status = useSelector(getStatus);
  let remain = 0;
  const [progress, setProgress] = useState(remain);
  const dispatch = useDispatch();
  // const isInitialMount = React.useRef(true);

  const ct = Promise.resolve();

  const startGifTracking = (ct) =>
    Promise.all([
      new Promise((resolve) => {
        dispatch(setStatus("idle"));
        setTimeout(() => {
          remain++;
          setProgress(Math.round((remain / gifSetting.numFrames) * 100));
          resolve(remain);
          if (remain != gifSetting.numFrames) {
            playSound();
            ct.then(startGifTracking(ct));
            setTimeout(() => {
              dispatch(setStatus("counter"));
            }, 1000);
          } else {
            setProgress(0);
            dispatch(setStatus("idle"));
          }
        }, gifSetting.interval * 1000);
      }),
    ]);

  const playSound = () => {
    shutterSound.play();
  };

  useEffect(() => {
    startGifTracking(ct);
    // if (isInitialMount.current) {
    //     isInitialMount.current = false;
    // } else {
    //     if (progress == 0) {
    //         console.log('counter ended');
    //         dispatch(setStatus('idle'));
    //     }
    // }
  }, []);

  return <div className="gif_pager" style={{ width: `${progress}%` }}></div>;
};
