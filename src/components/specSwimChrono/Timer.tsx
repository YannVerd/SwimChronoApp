import { Box, Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import DisplayTime from "./DisplayTime";
import Title from "../common/CustomTypo";


export default function Timer() {
  
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
      startTimeRef.current = Date.now() - currentTime; // stores the start time in memory, deducting any time that has already elapsed 
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
      <Title colorText="rgb(35, 103, 239)" text="Timer"/>
      <DisplayTime min={min} sec={sec} milli={milli}/>
      <Button onClick={handleStartTime}>{text}</Button>
      <Button>Lap</Button>
      <Button onClick={handleClearTime}>Clear</Button>
    </Box>
    
  );
}