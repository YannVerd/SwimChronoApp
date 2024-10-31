import { Typography } from "@mui/material";

interface ITime{
    min: number,
    sec: number,
    milli: number,
}

export default function DisplayTime(props:ITime){
    const { min, sec, milli} = props;

    return <Typography variant="h3" component="h4">{`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`}</Typography>
}