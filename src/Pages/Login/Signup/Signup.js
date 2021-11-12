import { Container, Grid, Typography, TextField, Button, Box, CircularProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginImg from './../../../images/login-bg.png';

const Signup = () => {
    const [registerData, setRegisterData] = useState({});
    const location = useLocation();
    const history = useHistory();
    const { user, authError, setAuthError, signInWithGoogle, registerUser, isLoading } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }

    const handleRegisterSubmit = e => {
        if (registerData.password !== registerData.password2) {
            setAuthError('Password does not matched! Try again.');
        }
        else {
            registerUser(registerData.userName, registerData.email, registerData.password, location, history);
        }
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
                    <Box sx={{ boxShadow: 4, borderRadius: 1, py: 5 }}>
                        <form onSubmit={handleRegisterSubmit}>
                            <Typography sx={{ fontWeight: 600 }} variant="h5" color="info.main">
                                Create An Account(Register)
                            </Typography>
                            <TextField
                                name="userName"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="User Name"
                                variant="standard"
                            />
                            <TextField
                                name="email"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Email"
                                type="email"
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
                            <TextField
                                name="password2"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Re-enter Password"
                                type="password"
                                variant="standard"
                            />
                            <br />
                            {
                                isLoading ?
                                    <CircularProgress />
                                    :
                                    <NavLink style={{ textDecoration: 'none', marginLeft: '75px' }} to="/login">
                                        <Button sx={{ textTransform: 'capitalize', fontSize: 15 }} variant="text">Already Registered? Login here.</Button>
                                    </NavLink>
                            }
                            <br />
                            <Button type="submit" sx={{ fontSize: '16px', width: '300px', mt: 2, backgroundColor: 'info.main' }} variant="contained">Register</Button>
                            <p>---------------------or----------------------</p>
                            <Button onClick={handleGoogleSignIn} sx={{ fontSize: '16px', width: '300px', textTransform: 'capitalize', fontWeight: '700' }} variant="outlined" color="warning">
                                <span style={{ paddingRight: '15px' }}><i className="fab fa-google"></i></span>
                                <span>Continue with Google</span>
                            </Button>
                        </form>

                        {user.email && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Register Successfull.
                        </Alert>}

                        {authError && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {authError}
                        </Alert>}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '85%', height: '98vh' }} src={loginImg} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Signup;