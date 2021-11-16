import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link, useHistory } from "react-router-dom";
import logo from './../../../images/logo.png';
import useAuth from '../../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, logOut } = useAuth();
    const history = useHistory();

    const handleGoToHome = () => {
        history.push('/')
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: '#263238' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Button sx={{ p: 0 }}><img onClick={handleGoToHome} style={{ width: 65 }} src={logo} alt="logo" /></Button>
                        <div className="titleLogo">
                            <Box>
                                <Typography sx={{ mt: 1, ml: 3 }} variant="h5" component="div">
                                    Bicycle Universe
                                </Typography>
                                <small style={{ marginLeft: '55px' }}>Your Bicycle KINGDOM</small>
                            </Box>
                        </div>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Link style={{ color: 'white', textDecoration: 'none', marginRight: '25px' }} to="/allCollection">All Collections</Link>
                        {user.email && <Link style={{ color: 'white', textDecoration: 'none', marginRight: '25px' }} to="/dashboard">Dashboard</Link>}
                        <Box>
                            {
                                !user.email ?
                                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/login"><Button variant="outlined" color="inherit">Login</Button></Link>
                                    :
                                    <Box>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            {
                                                user.photoURL ?
                                                    <img style={{ borderRadius: '50%', width: 30 }} src={user.photoURL} alt="profileImage" />
                                                    :
                                                    <AccountCircle />
                                            }
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem>Hey, {user.displayName}</MenuItem>
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={logOut}>Logout</MenuItem>
                                        </Menu>
                                    </Box>
                            }
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;