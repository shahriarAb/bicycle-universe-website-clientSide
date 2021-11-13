import { Button, TextField, Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const AddAProduct = () => {
    const [productInfo, setProductInfo] = useState({})

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...productInfo };
        newInfo[field] = value;
        setProductInfo(newInfo);
    }

    const handleOnSubmit = e => {
        fetch('http://localhost:5500/bicycles', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Product successfully added!');
                    e.target.reset();
                }
            });
        e.preventDefault();
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600', mb: 5 }} variant="h5">
                Add a new product to show on collection.
            </Typography>
            <form onSubmit={handleOnSubmit}>
                <TextField
                    name="name"
                    label="Bicycle Name"
                    variant="filled"
                    onBlur={handleOnBlur}
                    sx={{ width: '400px', mb: 1 }}
                    size="small"
                />
                <br />
                <TextField
                    name="price"
                    label="Price"
                    variant="filled"
                    onBlur={handleOnBlur}
                    sx={{ width: '400px', mb: 1 }}
                    size="small"
                />
                <br />
                <TextareaAutosize
                    name="description"
                    onBlur={handleOnBlur}
                    aria-label="minimum height"
                    minRows={6}
                    placeholder="Description of this product"
                    style={{ width: 400, marginBottom: '2px' }}
                />
                <br />
                <TextField
                    name="img"
                    label="Image URL"
                    variant="filled"
                    onBlur={handleOnBlur}
                    sx={{ width: '400px', mb: 1 }}
                    size="small"
                />
                <br />
                <Button sx={{ px: 5, fontWeight: 700 }} type="submit" color="warning" variant="contained">Add Product</Button>
            </form>
        </Box>
    );
};

export default AddAProduct;