import { Container, Grid, Typography, TextField, Button, Box, CircularProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginImg from './../../../images/login-bg.png';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, authError, loginUser, signInWithGoogle, isLoading } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault()
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <Container >
            <Grid container spacing={2}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
                    <Box sx={{ boxShadow: 4, borderRadius: 1, py: 11 }}>
                        <form onSubmit={handleLoginSubmit}>
                            <Typography sx={{ fontWeight: 700 }} variant="h5" color="info.main">
                                Login
                            </Typography>
                            <TextField
                                name="email"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                            />
                            <TextField
                                name="password"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Password"
                                type="password"
                                variant="standard"
                            />
                            <br />
                            {
                                isLoading ?
                                    <CircularProgress />
                                    :
                                    <NavLink style={{ textDecoration: 'none', marginLeft: '120px' }} to="/signup">
                                        <Button sx={{ textTransform: 'capitalize', fontSize: 15 }} variant="text">New User? Register here.</Button>
                                    </NavLink>
                            }
                            <br />
                            <Button type="submit" sx={{ fontSize: '16px', width: '300px', mt: 2, backgroundColor: 'info.main' }} variant="contained">Login</Button>
                            <p>---------------------or----------------------</p>
                            <Button onClick={handleGoogleSignIn} sx={{ fontSize: '16px', width: '300px', textTransform: 'capitalize', fontWeight: '700' }} variant="outlined" color="warning">
                                <span style={{ paddingRight: '15px' }}><i className="fab fa-google"></i></span>
                                <span>Continue with Google</span>
                            </Button>
                            {user.email && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Login Successfull
                            </Alert>}

                            {authError && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {authError}
                            </Alert>}
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '85%', height: '98vh' }} src={loginImg} alt="" />
                </Grid>
            </Grid >
        </Container >
    );
};

export default Login;