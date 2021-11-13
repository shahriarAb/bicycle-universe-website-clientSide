import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleMakeAdmin = e => {
        const user = { email };
        fetch('http://localhost:5500/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    setSuccess(true);
                }
            });
        e.preventDefault();
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600', mb: 3 }} variant="h5">
                Make Admin
            </Typography>
            {success && <Alert sx={{ display: 'flex', justifyContent: 'center', my: 2 }} severity="success"><strong>Make Admin Successfull!</strong></Alert>}
            <form onSubmit={handleMakeAdmin}>
                <TextField
                    name="email"
                    onBlur={handleOnBlur}
                    sx={{ width: 350 }}
                    id="filled-basic"
                    label="Email address"
                    variant="filled"
                />
                <br />
                <Button sx={{ mt: 1, width: '350px' }} type="submit" variant="contained" color="warning">Make Admin</Button>
            </form>
        </Box>
    );
};

export default MakeAdmin;