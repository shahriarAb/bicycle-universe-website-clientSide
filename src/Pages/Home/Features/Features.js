import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import feature1 from '../../../images/feature1.jpg';
import feature2 from '../../../images/feature2.jpg';
import feature3 from '../../../images/feature3.jpg';

const Features = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 2, fontWeight: 700, color: '#ffa600' }} variant="h4" data-aos="fade-down">
                OUR EXCLUSIVE SHOPS
            </Typography>
            <Grid container spacing={0}>
                <Grid item xs={12} md={4} data-aos="fade-up">
                    <Button><img width='100%' src={feature1} alt="" /></Button>
                </Grid>
                <Grid item xs={12} md={4} data-aos="fade-down">
                    <Button><img width='100%' src={feature2} alt="" /></Button>
                </Grid>
                <Grid item xs={12} md={4} data-aos="fade-up">
                    <Button><img width='100%' src={feature3} alt="" /></Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Features;