import { Box, Button, Container, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import DisplayTime from "./DisplayTime";
import Title from "../common/CustomTypo";

interface ILap{
  id: number, sec:number,
  min:number,
  milli: number
}

export default function Timer() {
  
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [min, setMin] = useState<number>(0)
  const [sec, setSec] = useState<number>(0)
  const [milli, setMilli] = useState<number>(0)
  const [text, setText] = useState<string>('Start')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [laps, setLaps] = useState<ILap[]>([])

  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const startTimeRef = useRef<number>(0);
  const idLapRef = useRef<number>(0);

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
    setLaps([]);
    idLapRef.current = 0;
  }

  useEffect(()=>{
    if (currentTime > 0) {
      convertToDisplayFormat();
    }
  }, [currentTime])

  const convertToDisplayFormat = () =>{
    if (currentTime === undefined) return;
    setMilli(currentTime!%1000);
    if(currentTime! >= 1000){
      setSec(Math.floor(currentTime! / 1000));
      if(sec! >= 60){
        setMin(Math.floor(sec! / 60));
        setSec(sec!%60);
      }
    }
  }

  const handleLaps = () => {
    idLapRef.current++
    setLaps((oldLaps) => {
      let newLaps = [...oldLaps]
      newLaps.push({id: idLapRef.current, sec: sec, min: min, milli: milli})
      return newLaps
    })
  }

  return(
    <Container>
      <Box>
        <Title colorText="rgb(35, 103, 239)" text="Timer"/>
        <DisplayTime min={min} sec={sec} milli={milli}/>
        <Button onClick={handleStartTime}>{text}</Button>
        <Button onClick={handleLaps}>Lap</Button>
        <Button onClick={handleClearTime}>Clear</Button>
      </Box>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Tour</TableCell>
            <TableCell>Interval</TableCell>
            <TableCell>Temps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            laps.map((lap)=>{
              return (
                <TableRow 
                  key={lap.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{lap.id}</TableCell>
                  <TableCell><DisplayTime min={lap.min} sec={lap.sec} milli={lap.milli}/></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>

      </TableContainer>
    </Container>
    
    
  );
}