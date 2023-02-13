import React from "react";
import {
  GetStart,
  Layouts,
  Booth,
  Legal,
  Experience,
  Frames,
  Capture,
} from "./components";
import { Route, Routes } from "react-router-dom";

export function Studio() {
  return (
    <div
      className="device"
      style={{ backgroundImage: `url(./images/studio_bg_3.jpeg)` }}
    >
      <div className="overlay"></div>
      <>
        <Routes>
          <Route path="/" element={<GetStart />} />
          <Route path="/welcome" element={<GetStart />} />
          <Route path="/layouts" element={<Layouts />} />
          <Route path="/feed" element={<Booth />}>
            <Route path="/feed/" element={<Experience />} />
          </Route>
          <Route path="/stori" element={<Booth />}>
            <Route path="/stori/" element={<Experience />} />
          </Route>
          <Route path="/frames" element={<Booth />}>
            <Route path="/frames/" element={<Frames />} />
          </Route>
          <Route path="/upload" element={<Legal />}></Route>
          <Route path="*" element={<GetStart />}></Route>
        </Routes>
      </>
    </div>
  );
}
