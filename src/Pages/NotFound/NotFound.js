import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const NotFound = () => {
    document.title = "Not Found - Bicycle Universe"
    return (
        <Box sx={{ my: 20, textAlign: 'center' }}>
            <Typography sx={{ color: 'red', fontWeight: 800 }} variant="h3">
                404 error
            </Typography>
            <Typography variant="h5">
                Nothing found here?!?
            </Typography>
            <Typography variant="p">
                Go back and find the correct path.
            </Typography>
            <br />
            <Button sx={{ mt: 3, px: 5 }} variant="contained" color="error" onClick={() => window.history.back()}>Back</Button>
        </Box >
    );
};

export default NotFound;