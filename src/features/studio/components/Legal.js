import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setImage, setVideoData, selectImage, selectExperience, changeScreen, selectCapturedVideo } from '../studioSlice';
import axios from "axios";
import Logo from './Logo';
import { MainLogo } from '.';

export const Legal = () => {
    
    const dispatch = useDispatch();
    const videos = useSelector(selectCapturedVideo);
    const image = useSelector(selectImage);
    const experience = useSelector(selectExperience);
    
    

    const [uploading, setUploading] = useState(false);

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
        },
    };

    const handleSubmit = (e) => {
        
        e.preventDefault()
        const { name, email, message } = e.target.elements
        console.log({name: name.value, email: email.value, message: message.value })

        // const formData = new FormData(e.currentTarget);
        // e.preventDefault();
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        setUploading(true);

        const formData = new FormData();
        formData.append('social_user', name.value.trim());
        formData.append('social_user_email', email.value.trim());
        formData.append('social_text', message.value.trim());
        formData.append('experience', experience);
        formData.append('mosaic_id', 174);
    
        if(experience == 'photo' || experience == 'GIF' || experience == 'boomerang') {
            formData.append('media', image);
        } else {
            formData.append('watermark', Logo);
            let videoFile = new File([videos], 'video-name.webm', { type: 'video/webm' });
            formData.append('media', videoFile);
        }
    
        axios
        .post(`${process.env.REACT_APP_BASE_URL}/storiapi/uploadshoutout`, formData, config)
        .then((res) => {
            console.log(res);
            let data = res.data;

            if(experience == 'video') {
                dispatch(setVideoData(data.record.social_video_url));
            } else {
                dispatch(setImage(data.record.social_image_url));
            }

            //return response.json();
            setUploading(false);
            dispatch(changeScreen('download'));
            // alert('File Upload success');
        })
        .catch((err) => {
            setUploading(false);
            console.log(err);
            alert('File Upload Error');
        });
    }

  return (
    <div className="screen_content">
        <div className="screen_content_wrap">
            <div className="mobile_screen">
                <div className="mobile_screen_wrap">
                    <div className="mobile_screen_logo">
                        <MainLogo />
                    </div>
                    <div className="mobile_screen_content mobile_screen_email">
                        <div className="heading">
                            <h4>Upload to server</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" name="name" className="form-control" placeholder="Your Name" value="Anis Momin" />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" className="form-control" placeholder="Your Email Address" value="anismomin.dev@gmail.com" />
                            </div>
                            <div className="form-group">
                                <textarea name="message" className="form-control" >
                                anis momin
                                </textarea>
                            </div>
                            <button type="submit" className=" btn btn-primary" disabled={uploading}>
                                { !uploading && 'Send' }
                                { uploading && 'Uploading...' }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
