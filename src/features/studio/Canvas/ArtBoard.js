import React, {useEffect} from 'react';
import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import { selectVideoConstraints, selectImage, selectExperience } from '../studioSlice';

const useFabric = (canvas) => {

  const fabricRef = React.useCallback((element) => {
    if (!element) return canvas.current?.dispose();

    canvas.current = new fabric.Canvas(element, {
      hoverCursor: 'pointer',
      selection: false,
      selectionBorderColor: 'blue',
      preserveObjectStacking: true,
      backgroundColor: null
    });
    // canvas.current.add(new fabric.Rect(
    //   {top: 100, left: 100, width: 100, height: 100, fill: 'red'}
    // ));

  }, []);
  return fabricRef;
};

export const ArtBoard = (props) => {

  const capturedImage = useSelector(selectImage);
  const videoConstraints = useSelector(selectVideoConstraints);
  const experience = useSelector(selectExperience);
  
  const { canvas } = props;
  const fabricRef = useFabric(canvas);
  let size = {
    width: videoConstraints.width,
    height: videoConstraints.height
  }
  useEffect(() => {
  
    var img = new Image();
    img.onload = () => {

      let f_img = new fabric.Image(img);
      f_img.scaleToWidth(videoConstraints.width);

      let val = 1;
      if(experience == 'photo') {
        val = 0.5;
      }

      canvas.current.setZoom(val);
      canvas.current.setWidth(f_img.width * val);
      canvas.current.setHeight(f_img.height * val);
      canvas.current.setBackgroundImage(f_img);
      canvas.current.renderAll();

    }
    // Set the src of the image with the base64 string
    img.src = capturedImage;

  }, [canvas, capturedImage]);
 
  return <canvas  ref={fabricRef} width={size.width} height={size.height} />;

}