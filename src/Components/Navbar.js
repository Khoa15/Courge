import * as React from 'react';
import AppContext from './AppContext';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LoginIcon from '@mui/icons-material/Login';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from '@mui/material';
import {useNavigate} from 'react-router-dom'
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '10px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
  }));

const pages = [];

function User(props){
    const navigate = useNavigate()
    const {state, dispatch} = React.useContext(AppContext);
    const {user} = state    
    const SignOut = () =>{
      localStorage.removeItem("token")
      dispatch({type: "CURRENT_USER", payload: null})
    }

    const handleToDashboard = ()=>{
      window.location = '/cpadmin'
    }

    return(
        <Box sx={{ flexGrow: 0 }}>
            {user.permission > 1 && <Tooltip title="Dashboard">
              <IconButton onClick={handleToDashboard}>
                <Avatar>
                  <DashboardIcon />
                </Avatar>
              </IconButton>
            </Tooltip>}

            <Tooltip title="User setting" onClick={()=>navigate("/user")}>
              <IconButton>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Sign Out" color='inherit'>
              <IconButton onClick={SignOut}>
                <Avatar>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
            </Tooltip>

        </Box>
    )
}

function ButtonLogin(props){
    const [values, setValues] = React.useState({
        open: false,
        showPassword: false
    });
    
    const handleOpenDialog = () => {
        setValues({...values, open: !values.open})
    }
    return (
        <Box sx={{display: { md: 'flex' } }}>
            <Tooltip title="Login">
                <Link href="/login.html" color="inherit">
                  <IconButton
                      size="large"
                      onClick={handleOpenDialog}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                  >
                      <LoginIcon />
                  </IconButton>
                </Link>
            </Tooltip>
        </Box>
    )
}

const ResponsiveAppBar = (props) => {
  const {state, dispatch} = React.useContext(AppContext);
  const {user} = state;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleTextSearch = (e)=>{
    dispatch({type: 'GET_SEARCH_BOX', search: e.target.value})
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" color="inherit" underline="none">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Courge
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href="/" color="inherit" underline="none">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Courge
            </Typography>
          </Link>
          
          <Box sx={{display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 1, display:{xs: 'none',sm:'flex'} }} />
          <Search sx={{display:{xs: 'none',sm:'flex'}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e)=>handleTextSearch(e)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1, display:{xs: 'none',sm:'flex'} }} />
          {user ? <User /> : <ButtonLogin />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
