import { Card, CardContent, Container, Grid, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const UserReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://salty-headland-52267.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <Container sx={{ mt: 6 }}>
            <Typography sx={{ mb: 6, fontWeight: 600, color: '#ffa600' }} variant="h5">
                Happy Client Says
            </Typography>
            <Grid container spacing={2}>
                {
                    reviews.map(review => <Grid key={review._id} item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, boxShadow: 5 }}>
                            <CardContent>
                                <Typography variant="body" color="text.secondary" component="div">
                                    {review.reviewText}
                                </Typography>
                                <Rating sx={{ mt: 1 }} name="read-only" value={review.rating} readOnly size="small" />
                                <Typography color="info.main" sx={{ fontWeight: 600, fontStyle: 'italic' }} variant="h6">
                                    {review.name}
                                </Typography>
                                <Typography color="secondary" variant="body2">
                                    {review.profession}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)
                }
            </Grid>
        </Container>
    );
};

export default UserReview;