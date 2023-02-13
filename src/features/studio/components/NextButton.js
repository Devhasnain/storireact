import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeScreen,
  selectScreen,
  ScreenNames,
  getStatus
} from '../studioSlice';
import indexOf from "lodash/indexOf";
import { useNavigate } from 'react-router-dom';

export const NextButton = (props) => {

    const status = useSelector(getStatus);
    const screen = useSelector(selectScreen);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const next = () => {
        if (screen==='decision') {
            navigate('/upload')
        } else {
            let index = indexOf(ScreenNames, screen);
            let newScreen = ScreenNames[index + 1];
            dispatch(changeScreen(newScreen));
        }
    }
    
    return (
        <>
            { screen !== 'capture' && <button className="btn btn-primary" onClick={next} disabled={status == 'capturing'}>{ props.title ?? 'Next'}</button> } 
       </>
    );
}
