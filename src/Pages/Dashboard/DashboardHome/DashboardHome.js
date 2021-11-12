import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const DashboardHome = () => {
    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600', mb: 5 }} variant="h5">
                Dashboard Home
            </Typography>
            <Typography variant="p">
                Select an option from left side drawer to go to dedicated page/route.
            </Typography>
        </Box>
    );
};

export default DashboardHome;