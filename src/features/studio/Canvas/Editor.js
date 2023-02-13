import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getStatus,
    selectVideoConstraints,
    // setStatus,
    // selectScreen,
    // selectImage,
    // selectCapturedVideo,
} from '../studioSlice';

import { MainLogo, BoothNav, Loader, NextButton } from '../components';
import { Sticker, ArtBoard } from './';

export const Editor = (props) => {

    const canvas = React.useRef(null);
    const status = useSelector(getStatus);
    const videoConstraints = useSelector(selectVideoConstraints);

    // const screen = useSelector(selectScreen);
    // const capturedImage = useSelector(selectImage);
    // const videoData = useSelector(selectCapturedVideo);
    // const dispatch = useDispatch();

    return (
        <div className="screen_content">
            <div className="screen_content_wrap">
                <div className="mobile_screen" style={{ maxWidth: videoConstraints.width + 50 + 'px' }}>
                    <div className="mobile_screen_wrap">
                        <div className="mobile_screen_logo">
                            <MainLogo />
                        </div>
                        <div className="filter_frame_box_wrape" style={{ height: videoConstraints.height + 'px', width: videoConstraints.width + 'px' }}>
                            <ArtBoard canvas={canvas} />
                            {status === 'loading' && <Loader />}
                        </div>
                        <Sticker canvas={canvas} />
                        <div style={{ textAlign: 'center', width: '100%', marginTop: '20px'}}>
                            <NextButton title="SKIP >" />
                        </div>
                    </div>
                    <br />
                    <br />
                    <BoothNav />
                </div>
            </div>
        </div>
    );
}
