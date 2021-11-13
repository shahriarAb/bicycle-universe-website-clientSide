import { Button, Card, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

const ManageProducts = () => {
    const [allProduct, setAllProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5500/bicycles')
            .then(res => res.json())
            .then(data => {
                setAllProduct(data);
                setIsLoading(false);
            });
    }, []);

    const handleDelete = id => {
        const confirmation = window.confirm('Are you sure want to delete this product?');
        if (confirmation) {
            fetch(`http://localhost:5500/bicycles/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount) {
                        alert('Successfully deleted this product!');
                        const remainingProducts = allProduct.filter(product => product._id !== id);
                        setAllProduct(remainingProducts);
                    }
                })
        }
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
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600', mb: 5 }} variant="h5">
                All bicycles in the Collection
            </Typography>
            <Box>
                <Grid container spacing={3}>
                    {
                        (allProduct.length === 0) ?
                            <Typography sx={{ color: 'red', textAlign: 'center' }} variant='p'>
                                There is no products in the collection.
                            </Typography>
                            :
                            allProduct.map(product =>
                                <Grid key={product._id} item xs={12} md={6}>
                                    <Card sx={{ maxWidth: 400, boxShadow: 3 }}>
                                        <CardContent sx={{ textAlign: 'left' }}>
                                            <Typography sx={{ fontSize: 16, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                                Product Details
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Product Name: <b>{product.name}</b>
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Price: <b>{product.price}</b>
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" variant="contained" color="warning">Edit Product</Button>
                                            <Button onClick={() => handleDelete(product._id)} size="small" variant="contained" color="error">Delete Product</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)
                    }
                </Grid>
            </Box>
        </Box>
    );
};

export default ManageProducts;