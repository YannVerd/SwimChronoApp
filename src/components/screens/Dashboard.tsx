import { Box } from "@mui/material"
import NavBar from "../fixed/NavBar"
import Timer from "../specSwimChrono/Timer"

export default function Dashboard () {
    return (
        <>
            <NavBar />
            <Box sx={{marginTop:'4rem', width:'98%', marginX: 'auto' }}>
                <h1>I'm the DashBoard</h1>
                <Timer />
            </Box>
            
            
        </>
        
    )
}