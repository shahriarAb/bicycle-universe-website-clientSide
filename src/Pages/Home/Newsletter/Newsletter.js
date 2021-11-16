import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
    return (
        <Grid container spacing={1} sx={{ backgroundColor: '#333836', mt: 20, py: 4 }} className="newsLetter">
            <Grid item sx={{ color: 'white' }} xs={12} md={6}>
                <Box sx={{ display: 'flex', ml: 8 }} className="latestUpdate" data-aos="fade">
                    <Box>
                        <i style={{ fontSize: 60 }} className="fas fa-envelope-open-text"></i>
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h4">
                            Sign Up For Newsletter
                        </Typography>
                        <Typography variant="p">
                            Signup Our newsletter And get latest updates...
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item sx={{ mt: 1 }} xs={12} md={6} className="searchBox" data-aos="fade">
                <TextField sx={{ width: '50%' }} color="primary" label="Your email address" variant="outlined" size="small" />
                <Button variant="contained">Subscribe</Button>
            </Grid>
        </Grid >
    );
};

export default Newsletter;