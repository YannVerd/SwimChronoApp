import { Typography, IconButton, Box } from "@mui/material";;
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useNavigate } from "react-router-dom";

export default function Title(){
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex', gap:'1rem'}}>
            <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
                <AccessAlarmIcon color="primary"/>
            </IconButton>
            <Typography
                component="h4"
                variant="h6"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: 'rgb(58, 126, 243)'}}
            >
                Swim'Chrono
            </Typography>
        </Box>
        
    )
}