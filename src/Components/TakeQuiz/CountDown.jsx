import React,{useState,useEffect,useRef} from 'react'

const CountDown = ({ initialTime, onComplete }) => {
    const [time, setTime] = useState(initialTime);
    const countdownRef = useRef();
  
    useEffect(() => {
      if (time > 0) {
        countdownRef.current = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        clearInterval(countdownRef.current);
        onComplete();
      }
  
      return () => clearInterval(countdownRef.current);
    }, [time, onComplete]);
  
    const formattedTime = () => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  
    return <h1>{formattedTime()}s</h1>;
  };
export default CountDown;