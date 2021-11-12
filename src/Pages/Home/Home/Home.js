import { Box } from '@mui/system';
import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import Banner from '../Banner/Banner';
import Bicycles from '../Bicycles/Bicycles';
import Features from '../Features/Features';
import Newsletter from '../Newsletter/Newsletter';
import Slider from '../Slider/Slider';
import UserReview from '../UserReview/UserReview';

const Home = () => {
    return (
        <Box className="App">
            <Header />
            <Banner />
            <Slider />
            <Features />
            <Bicycles />
            <UserReview />
            <Newsletter />
            <Footer />
        </Box>
    );
};

export default Home;