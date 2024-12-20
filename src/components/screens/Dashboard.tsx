import { Box } from "@mui/material"
import NavBar from "../fixed/NavBar"
import Timer from "../specSwimChrono/Timer"
import { useContext} from "react"
import { IUserContext, UserContext } from "../../datas/context"

export default function Dashboard () {
    const { user } = useContext<IUserContext | any>(UserContext)

    return (
        <>
            <NavBar />
            <Box sx={{marginTop:'5rem', width:'98%', marginX: 'auto' }}>
                <h1>Bienvenue {user ? user.username: ''}!</h1>
                <Timer />
            </Box>         
        </>
    )
}