import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from 'fabric';

import Carousel from "react-simply-carousel";
import {
  setFrame,
  selectImage
} from '../studioSlice';

export const Sticker = (props) => {

    const dispatch = useDispatch();
    const capturedImage = useSelector(selectImage);
    const {canvas} = props;

    let frames = ['./images/frame_1.png', './images/frame_2.png', './images/frame_3.png', './images/frame_4.png', './images/frame_5.png', './images/frame_6.png'];
    const [activeSlide, setActiveSlide] = useState(0);

    const drawRect = () => {
        canvas.current.add(new fabric.Rect(
          {top: 100, left: 100, width: 100, height: 100, fill: 'red'}
        ));
    };

    //filter part 1
	const applyFilter = (index) => {
		
		var obj = fabric.util.object.clone(this.loadedImage);
		//var obj = this.loadedImage;
		var f = fabric.Image.filters;
		if(this.filtersArray[index] == 'grayscale') {
			obj.filters[0] = new f.Grayscale();
		} else if(this.filtersArray[index] == 'polaroid') {
			obj.filters[0] = (new f.Polaroid());
		}else if(this.filtersArray[index] == 'contrast') {
			obj.filters[0] = new f.Contrast({contrast: 0.5 });
		}else if(this.filtersArray[index] == 'sepia') {
			obj.filters[0] = (new f.Sepia());
		}else if(this.filtersArray[index] == 'saturation') {
			obj.filters[0] = new f.Saturation({saturation: 0.5});
		}else if(this.filtersArray[index] == 'brightness') {
			obj.filters[0] = new f.Brightness({brightness: 0.3});
		}else if(this.filtersArray[index] == 'hue') {
			obj.filters[0] = new f.HueRotation({rotation: 110});
		}else if(this.filtersArray[index] == 'polaroid') {
			obj.filters[0] = (new f.Polaroid());
		}
		obj.applyFilters();
		this.filteredImg = obj;
		this.artCanvas.setBackgroundImage(obj);
		this.artCanvas.renderAll();
	}

    return (
        <div className="stori_frame_box">    
            <div className="stori_frame_box_wrap">
                <div className="heading">
                    <h4>Select a Sticker</h4>
                </div>
            </div>
            <div id="stori_frame_slider" className="stori_frame_slider">
                <Carousel
                    updateOnItemClick
                    containerProps={{
                    style: {
                        width: "100%",
                        justifyContent: "space-between"
                    }
                    }}
                    activeSlideIndex={activeSlide}
                    activeSlideProps={{
                    style: {
                        borderColor: "#48a0f5"
                    }
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
                            boxSizing: "border-box"
                            }}
                            key={index}
                            className="frame_slider_box"
                            onClick={drawRect}
                        >
                            <img src={item} alt={item} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
