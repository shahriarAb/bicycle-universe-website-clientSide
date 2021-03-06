import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Bicycle from '../Home/Bicycles/Bicycle/Bicycle';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const AllCollection = () => {
    const [bicycles, setBicycles] = useState([]);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    document.title = "All Collections - Bicycle Universe"

    useEffect(() => {
        setIsLoading(true);
        fetch('https://salty-headland-52267.herokuapp.com/bicycles')
            .then(res => res.json())
            .then(data => {
                setBicycles(data);
                setIsLoading(false);
            });
    }, []);

    const handleToHome = () => {
        history.push('/');
    }

    if (isLoading) {
        return (
            <Box sx={{ mt: 7 }}>
                <CircularProgress />
                <h5>Loading...</h5>
            </Box>
        );
    }
    return (
        <div className="App">
            <Header />
            <Container sx={{ mt: 3, mb: 10 }}>
                <Typography sx={{ mb: 5, fontWeight: 700, color: '#ffa600', textAlign: 'left' }} variant="h4">
                    Our Full Collection
                </Typography>
                <Grid container spacing={3}>
                    {
                        bicycles.map(bicycle => <Bicycle
                            key={bicycle._id}
                            bicycle={bicycle}
                        >
                            <Button onClick={handleToHome} sx={{ px: 5, fontWeight: 700 }} variant="contained" color="primary">Home</Button>
                        </Bicycle>)
                    }
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default AllCollection;