import { Typography} from "@mui/material";;


export default function Title({colorText, text = 'SwimChrono'}:{colorText: string, text?: string}){
    return (
            <Typography
                component="h4"
                variant="h6"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: `${colorText}`}}
            >
                {text}
            </Typography>
   
    )
}