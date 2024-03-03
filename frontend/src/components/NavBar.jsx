import React, { useState, useEffect } from "react";
import { Stack,Button,CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "./../assets/Logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API } from "../utils/API";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import UpdateAccount from "../components/updateAccount";
import DeleteIcon from '@mui/icons-material/Delete';


const NavBar = () => {
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  async function doDelete(){
    await API.deleteUser(user.userId)
    localStorage.clear()
    window.location.reload(false);
}

  async function loadUser(id){
    const aa = await API.userById(id)
    setUser(aa.data)
  }

  useEffect(() => { 
    setToken(localStorage.getItem('token'))
    setUser(JSON.parse(localStorage.getItem('user')))
    loadUser(user?.userId)
    
    
  },[])


  function deco(){
    localStorage.clear()
    window.location.reload(false);

  }


  const theme = createTheme({
    palette: {
      secondary: {
        // This is green.A700 as hex.
        main: '#F31503',
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
    <Stack
    zIndex={100}
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#272727",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={Logo} alt="logo" height={100}  style={{paddingLeft:'30px'}}/>       
      </Link>

      
      
      {!token ? 
      <Link to ="/login" >
        <button height={100} color="#fff" className="login-btn" >Login/Register</button>
      </Link> : 
      ""
        }

      {token && user?.role == "admin" ? 
      <Link to="/chart" style={{ display: "flex", alignItems: "center" }}>
      </Link>:"" }



      {token ? <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <CardMedia image={user?.url} sx={{ borderRadius: "50%",width: 40, height: 40 }}></CardMedia>
          </IconButton>
        </Tooltip>
      </Box> : ""}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/manage">
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <Divider />
        
        <MenuItem onClick={() => {  }}>
        <ListItemIcon>
          <UpdateAccount/>
        </ListItemIcon>
        Update Profile
        </MenuItem>
        <MenuItem onClick={() => { deco() }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={() => { doDelete() }}>
          <DeleteIcon>
            <Logout fontSize="small" />
          </DeleteIcon>
          Delete Account
        </MenuItem>
      </Menu>
      
      
        




    </Stack>
    </ThemeProvider>
  );
};
/*
{user ? <UpdateAccount/> : ""}
        {user ? <DeleteIcon  sx={{
                "&:hover": { backgroundColor: "grey" },
                color: "white",
                borderRadius: "12px",
                marginLeft:2,
                fontSize:50
            }}
            onClick={doDelete}>
          </DeleteIcon> : ""}
*/
export default NavBar;