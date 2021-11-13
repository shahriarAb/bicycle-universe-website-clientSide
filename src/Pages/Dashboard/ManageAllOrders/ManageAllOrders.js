import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

const ManageAllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5500/orders')
            .then(res => res.json())
            .then(data => {
                setAllOrders(data)
                setIsLoading(false);
            });
    }, []);

    const handleUpdateStatus = id => {
        fetch(`http://localhost:5500/orders/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(allOrders.status)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    alert('Status updated successfully.');
                    window.location.reload();
                }
            })
    }

    const handleDelete = id => {
        const confirmation = window.confirm('Are you sure cancel this order?');
        if (confirmation) {
            fetch(`http://localhost:5500/orders/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount) {
                        alert('Successfully canceled this order');
                        const remainingOrders = allOrders.filter(myOrder => myOrder._id !== id);
                        setAllOrders(remainingOrders);
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
                Orders placed by a customers/client.
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    {
                        (allOrders.length === 0) ?
                            <Typography sx={{ color: 'red', textAlign: 'center' }} variant='p'>
                                No orders found!!
                            </Typography>
                            :
                            allOrders.map(order =>
                                <Grid key={order._id} item xs={12} md={12}>
                                    <Card sx={{ minWidth: 300, boxShadow: 3 }}>
                                        <CardContent sx={{ textAlign: 'left' }}>
                                            <Typography sx={{ fontSize: 16, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                                Order No: {order._id}
                                            </Typography>
                                            <Typography variant="p" component="div">
                                                Orderer Name: <b>{order.customerName}</b>
                                            </Typography>
                                            <Typography variant="p" component="div">
                                                Orderer Email: <b>{order.email}</b>
                                            </Typography>
                                            <Typography variant="p" component="div">
                                                Address: <b>{order.address}</b>
                                            </Typography>
                                            <Typography variant="p" component="div">
                                                Phone No.: <b>{order.phone}</b>
                                            </Typography>
                                            <Typography variant="p" component="div">
                                                Order Date: <b>{order.date}</b>
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Product Name: <b>{order.orderName}</b>
                                            </Typography>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography variant="body" component="div">
                                                    Price: <b>{order.price}</b>
                                                </Typography>
                                                <Typography sx={{ ml: 3 }} variant="body" component="div">
                                                    Status: {
                                                        order.status === 'Shipped' ?
                                                            <span style={{ backgroundColor: 'green', color: 'white', padding: '3px 8px', borderRadius: '5px' }}>Shipped</span>
                                                            :
                                                            <span style={{ backgroundColor: 'red', color: 'white', padding: '3px 8px', borderRadius: '5px' }}>Pending</span>
                                                    }
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => handleUpdateStatus(order._id)} size="small" variant="contained" color="success">Update Status</Button>
                                            <Button onClick={() => handleDelete(order._id)} size="small" variant="contained" color="error">Delete Order</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)
                    }
                </Grid>
            </Box>
        </Box>
    );
};

export default ManageAllOrders;