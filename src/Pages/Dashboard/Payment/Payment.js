import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Payment = () => {
    document.title = "Payment - Bicycle Universe"

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600' }} variant="h5">
                Payment System coming soon...
            </Typography>
        </Box>
    );
};

export default Payment;