import React, {useEffect, useState}  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, selectCounter } from '../studioSlice';

export const Counter = (props) => {

    const counterInit = useSelector(selectCounter);
    let remain = counterInit;
    const [counter, setCounter] = useState(remain);
    const dispatch = useDispatch();
    // const isInitialMount = React.useRef(true);

    const ct = Promise.resolve();
  
    const countdown = (ct) => (Promise.all([new Promise(resolve => {
      setTimeout(() => {
        remain--;
        setCounter(remain);
        resolve(remain);
        if (remain > 0) {
          ct.then(countdown(ct));
        } else {
          setCounter(0);
        }
      }, 1000);
    })]));
  
    const startCountdown = () => {
      dispatch(setStatus('counter'));
      countdown(ct);
    }

    useEffect(() => {
        startCountdown();
        // if (isInitialMount.current) {
        //     isInitialMount.current = false;
        // } else {
        //     if (counter == 0) {
        //         console.log('counter ended');
        //         dispatch(setStatus('idle'));
        //     }
        // }
    }, [])


    return (
        <div className="counter_frame"><span>{counter}</span></div>
    );

}
