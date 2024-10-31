import { IconButton, Box } from "@mui/material";;
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useNavigate } from "react-router-dom";
import Title from "../common/CustomTypo";

export default function HeaderTitle({colorText}:{colorText: string}){
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex', gap:'1rem'}}>
            <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
                <AccessAlarmIcon color="primary"/>
            </IconButton>
            <Title colorText={colorText} />
        </Box>
        
    )
}