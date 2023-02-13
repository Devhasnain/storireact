import React from 'react'
import { useState, useEffect } from 'react';

export const VideoTimer = (props) => {
    const { initialMinute = 7, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    
    useEffect(() => {
       
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    props.timeOverEvent();
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        
        return () => {
            clearInterval(myInterval);
        };

    });

    return (
        <div className="videoTimer" style={{ position : 'absolute', bottom: '0px', textAlign: 'center', width: '100%', color: 'white'}}>
            {minutes === 0 && seconds === 0
                ? null
                : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}
