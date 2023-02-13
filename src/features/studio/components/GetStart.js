import React from 'react';
import { Link } from 'react-router-dom';

export const GetStart = () => {
    return (
        <div className="screen_content starting_content">
            <div className="screen_content_wrap">
                <div className="mobile_screen">
                    <div className="mobile_screen_wrap" style={{ backgroundImage: `url(images/mobile_screen_bg.jpg)` }} >
                        <div className="mobile_screen_logo">
                            <img src="images/stori_logo.svg" alt="" />
                        </div>
                        <div className="mobile_screen_content">
                            <div className="heading">

                                <h3>Stay Ahead in Style</h3>
                                <p>Share your love for sport at our virtual product launch.</p>
                            </div>
                            <Link className="btn btn-primary" to={'/layouts'}>Let's Start</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
