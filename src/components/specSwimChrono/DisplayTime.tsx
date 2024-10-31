import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface IDisplayTime{
    time: number
    component?: React.ElementType<any, keyof React.JSX.IntrinsicElements>
}

export default function DisplayTime({time, component = 'h4'}:IDisplayTime){
  
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)
    const [milli, setMilli] = useState<number>(0)

    useEffect(()=>{
        setMilli(time % 1000);
        setSec(Math.floor((time / 1000) % 60));
        setMin(Math.floor((time / 60000) % 60));
    },[time])
    

    return <Typography variant="h3" component={component}>{`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`}</Typography>
}