import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const Myorder = () => {
    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5500/myOrders?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data);
                setIsLoading(false)
            })
    }, [user.email]);

    const handleDelete = (id) => {
        const confirmation = window.confirm('Are you sure cancel this order?');
        if (confirmation) {
            fetch(`http://localhost:5500/orders/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount) {
                        alert('Successfully canceled this order');
                        const remainingOrders = myOrders.filter(myOrder => myOrder._id !== id);
                        setMyOrders(remainingOrders);
                    }
                });
        }
    }

    if (isLoading) {
        return (
            <Box sx={{ mt: 7 }}>
                <CircularProgress />
                <h5>Loading...</h5>
            </Box>
        )
    }
    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600', mb: 5 }} variant="h5">
                My Orders
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    {
                        (myOrders.length === 0) ?
                            <Typography sx={{ color: 'red', textAlign: 'center' }} variant='p'>
                                Your cart is empty. Please go to home or All Collections page to order.
                            </Typography>
                            :
                            myOrders.map(myOrder =>
                                <Grid key={myOrder._id} item xs={12} md={4}>
                                    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
                                        <CardContent sx={{ textAlign: 'left' }}>
                                            <Typography sx={{ fontSize: 16, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                                Order Summury
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Product Name: <b>{myOrder.orderName}</b>
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Price: <b>{myOrder.price}</b>
                                            </Typography>
                                            <Typography variant="body" component="div">
                                                Orderer Name: <b>{myOrder.customerName}</b>
                                            </Typography>
                                            <Typography variant="body2">
                                                Phone No.: {myOrder.phone}
                                            </Typography>
                                            <Typography variant="body2">
                                                Address: {myOrder.address}
                                            </Typography>
                                            <Typography variant="body2">
                                                Order Date: {myOrder.date}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button size="small" variant="contained" color="warning">Track Order</Button>
                                            <Button onClick={() => handleDelete(myOrder._id)} size="small" variant="contained" color="error">Cancel Order</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)
                    }
                </Grid>
            </Box>
        </Box>
    );
};

export default Myorder;