import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import banner from './../../../images/banner.jpg';

const Banner = () => {
    const history = useHistory();

    const handleBuyNow = () => {
        history.push('/allCollection');
    }

    return (
        <Box sx={{ position: 'relative', mt: 8 }}>
            <img style={{ width: '100%' }} src={banner} alt="" data-aos="fade-up-right" />
            <Box sx={{ position: 'absolute', bottom: 220, ml: 3, }}>
                <Typography sx={{ textAlign: 'left', fontFamily: 'Oleo Script Swash Caps' }} variant="h4" data-aos="fade-right" data-aos-duration="2000">
                    Life is like <br /> riding a bicycle.<br /> To keep your balance <br /> you must keep moving!
                </Typography>
                <Button onClick={handleBuyNow} sx={{ backgroundColor: 'red', fontWeight: 600, px: 7, py: 1, float: 'left', mt: 2 }} variant="contained" data-aos="fade-right" data-aos-duration="3000">Buy Now</Button>
            </Box>
        </Box>
    );
};

export default Banner;