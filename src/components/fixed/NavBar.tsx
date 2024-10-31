import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Title from "../common/CustomTypo";

const NavBar = () => {
  const navItems = [{name: 'Home', link:'/dashboard'}, {name:'About', link:'/about'},{name:'Contact', link:'/contact'}];
  const navigate = useNavigate();
  return (
    <AppBar component="nav">
        <Toolbar sx={{display: 'flex' , justifyContent: 'space-between'}}>
          <Title colorText="withe"/>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', width: '20rem'}}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff' }} onClick={()=>{navigate(`${item.link}`)}}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    
  );
}

export default NavBar;