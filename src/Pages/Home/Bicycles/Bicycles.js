import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Bicycle from './Bicycle/Bicycle';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';

const Bicycles = () => {
    const [bicycles, setBicycles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://salty-headland-52267.herokuapp.com/bicycles')
            .then(res => res.json())
            .then(data => {
                setBicycles(data);
                setIsLoading(false);
            });
    }, []);

    const featuredBicycles = [];
    for (let i = 0; i <= 5; i++) {
        featuredBicycles.push(bicycles[i]);
    }

    if (isLoading) {
        return (
            <Box sx={{ top: '20%' }}>
                <CircularProgress />
                <h5>Loading...</h5>
            </Box>
        );
    }
    return (
        <Container sx={{ mt: 7 }}>
            <Typography sx={{ mb: 6, fontWeight: 700, color: '#ffa600' }} variant="h4">
                OUR FEATURED BIKE COLLECTION
            </Typography>
            <Grid container spacing={3}>
                {
                    featuredBicycles.map(bicycle => <Bicycle
                        key={bicycle._id}
                        bicycle={bicycle}
                    ></Bicycle>)
                }
            </Grid>
            <NavLink to="/allCollection">
                <Button sx={{ fontSize: '16px', fontWeight: 700, mt: 2 }} variant="text">See More Bicycles &gt;&gt;</Button>
            </NavLink>
        </Container>
    );
};

export default Bicycles;