import { Box, Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";


export default function Timer() {
  const [startTime, setStartTime]= useState<number | undefined>()
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [min, setMin] = useState<number>(0)
  const [sec, setSec] = useState<number>(0)
  const [milli, setMilli] = useState<number>(0)
  const [text, setText] = useState<string>('Start')
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - currentTime;
      timerRef.current = setInterval(() => {
        setCurrentTime(Date.now() - (startTimeRef.current || Date.now()));
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isRunning]);

  const handleStartTime = () => {
    setIsRunning(!isRunning);
    setText(isRunning ? 'Resume' : 'Stop');
  };

  const handleClearTime = () => {
    clearInterval(timerRef.current);
    setStartTime(undefined);
    setCurrentTime(0);
    setMin(0);
    setSec(0);
    setMilli(0);
  }

  useEffect(()=>{
    if (currentTime > 0) {
      convertToDisplayFormat();
    }
  }, [currentTime])

  const convertToDisplayFormat = () =>{
    if (currentTime === undefined) return;
    console.log(currentTime)
    setMilli(currentTime!%1000);
    if(currentTime! >= 1000){
      setSec(Math.floor(currentTime! / 1000));
      if(sec! >= 60){
        setMin(Math.floor(sec! / 60));
        setSec(sec!%60);
      }
    }
  }
  return(
    <Box>
      <h1> Timer</h1>
      <h4>{`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`}</h4>
      <Button onClick={handleStartTime}>{text}</Button>
      <Button>Lap</Button>
      <Button onClick={handleClearTime}>Clear</Button>
    </Box>
    
  );
}