import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   changeScreen,
//   selectScreen,
// } from '../studioSlice';

export const Header = () => {
  return (
    <header>
        <div className="header_wrap">
            <div className="logo">
                <a href="#">
                    <img src="./images/Stori_Virtual_Tour.svg" />
                </a>
            </div>
            <div className="nav-section">
                <ul>
                    <li>
                        <a href="live-streaming.php" className="btn"><i className="far fa-video"></i><span>Live Stream</span></a>
                    </li>
                    <li>
                        <a href="#" className="btn"><i className="far fa-camera"></i><span>Selfie</span></a>
                    </li>
                    <li>
                        <a href="#" className="btn"><i className="fal fa-images"></i><span>Gallery</span></a>
                    </li>
                    <li>
                        <a href="feedback.php" className="btn active"><i className="fal fa-comment-lines"></i><span>Feedback</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
  );
}
