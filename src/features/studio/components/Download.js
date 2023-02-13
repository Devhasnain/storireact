import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeScreen,
    selectImage,
    selectCapturedVideo,
    selectVideoConstraints,
    selectExperience
} from '../studioSlice';

export const Download = () => {
   
    const experience = useSelector(selectExperience);
    const dispatch = useDispatch();
    const capturedImage = useSelector(selectImage);
    const videoData = useSelector(selectCapturedVideo);
    const image = useSelector(selectImage);

    const videoConstraints = useSelector(selectVideoConstraints);
    
    const b64toBlob = (bytesBase64, mimeType, fileName) => {
        
        fetch(bytesBase64)
            .then(response => response.blob())
            .then(blob => {
                var link = window.document.createElement("a");
                link.href = window.URL.createObjectURL(blob, { type: mimeType });
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

    const handleDownload = React.useCallback(() => {
        if(experience === 'video') {
            const url = URL.createObjectURL(videoData);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = `${Date.now()}.webm`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
        // else if (experience === 'photo') {
        //     b64toBlob(capturedImage, 'image/jpeg', `${Date.now()}.jpeg`);
        // } 
        // else if (experience === 'GIF') {
        //     b64toBlob(capturedImage, 'image/gif', `${Date.now()}.gif`);
        // } 
        else {
 
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = image;
            a.download = `${Date.now()}`;
            a.click();
            window.URL.revokeObjectURL(image);
        }
    
    }, [experience]);

    return (
        <div className="screen_content">
            <div className="screen_content_wrap mobile_download_screen">
                <div className="mobile_screen">
                    <div className="mobile_screen_wrap">
                        <div className="mobile_screen_logo" onClick={() => dispatch(changeScreen('welcome'))}>
                            <img src="./images/Stori_Virtual_Tour_Logo_white.svg" alt="Logo" />
                        </div>
                        <div className="stori_frame_box">
                            <div className="stori_frame_box_wrap">
                                <div className="frame_image">
                                    {capturedImage && <img src={`${capturedImage}`} alt={experience} />}
                                    {videoData && <video src={videoData.includes("http") ? videoData : URL.createObjectURL(videoData)} height={videoConstraints.height} width={videoConstraints.width} controls={false} autoPlay loop playsinline></video>}
                                </div>
                                <div className="heading">
                                    <h4>Download &amp; Share</h4>
                                    <p>Share your snap via your favorite virtual platform!</p>
                                </div>
                            </div>
                        </div>
                        <div className="stori_share_wrap">
                            <div className="download_icon icon" onClick={() => handleDownload()}>
                                <img src="./images/download.svg" alt="Download" />
                            </div>
                            <div className="share_icon icon">
                                <img src="./images/share.svg" alt="Share" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
