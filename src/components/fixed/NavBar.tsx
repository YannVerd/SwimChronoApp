import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import HeaderTitle from "./HeaderTitle";
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { DatasContext, ISnack, IUserContext, UserContext } from "../../datas/context";
import { endpoints } from "../../datas/api";


const NavBar = () => {
  const navItems = [{name: 'Home', link:'/dashboard'}, {name:'Athlètes', link:'/atheletes'}];
  const navigate = useNavigate();
  const {setUser} = useContext<IUserContext | any>(UserContext)
  const {setSnack} = useContext<ISnack | any>(DatasContext)
  return (
    <AppBar component="nav">
        <Toolbar sx={{display: 'flex' , justifyContent: 'space-between'}}>
          <HeaderTitle colorText="withe"/>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', width: '20rem'}}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff' }} onClick={()=>{navigate(`${item.link}`)}}>
                {item.name}
              </Button>
            ))}
            <IconButton onClick={()=>{
              setUser(null)
              
              fetch(endpoints.logout)
                  .then(async (res)=>{
                    if(res.ok){
                        res.json()
                    }else{
                      const error = await res.json();
                      throw new Error(error.message || 'Authentication failed');
                    }
                  })
                  .then(() => {
                  localStorage.removeItem('xsrfToken')
                  navigate('/')
                })
                .catch((err) => {
                  console.error('Logout failed', err.message)
                  setSnack((old: ISnack)=>(
                    {
                      ...old,
                      open: true,
                      message: err.message
                    }
                  )
                  )
                })

            }}>
              <Logout sx={{color: 'white'}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    
  );
}

export default NavBar;