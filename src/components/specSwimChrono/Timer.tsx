import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";


export default function Timer() {
  const [startTime, setStartTime]= useState<number | undefined>()
  const [currentTime, setCurrentTime] = useState<number | undefined>()
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  const [min, setMin] = useState<number | undefined>()
  const [sec, setSec] = useState<number | undefined>()
  const [milli, setMilli] = useState<number | undefined>()
  const [text, setText] = useState<string>('Start')
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    if(isRunning){
      setText('Stop');
        setStartTime(Date.now());
        timer = setInterval(()=>{
          setCurrentTime(Date.now() - startTime!)}, 10);
    }else{
      setText('Resume')
      clearInterval(timer)
    }
  }, [isRunning])

  const handleStartTime = () => {
    setIsRunning(!isRunning)
  }

  const handleClearTime = () => {
    clearInterval(timer);
    setStartTime(undefined);
    setCurrentTime(undefined);
    setMin(undefined);
    setSec(undefined);
    setMilli(undefined);
  }

  useEffect(()=>{
    convertToDisplayFormat()
  }, [currentTime])
  const convertToDisplayFormat = () =>{
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
      <h4>{`${min?.toString() || '00'}:${sec?.toString()|| '00'}.${milli?.toString()|| '000'}`}</h4>
      <Button onClick={handleStartTime}>{text}</Button>
      <Button>Lap</Button>
      <Button onClick={handleClearTime}>Clear</Button>
    </Box>
    
  );
}