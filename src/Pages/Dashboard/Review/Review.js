import { Button, Rating, TextField, Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const Review = () => {
    const { user } = useAuth()
    const [value, setValue] = useState(0);

    const initialReview = { name: user.displayName, reviewText: '', profession: 'cyclist' }
    const [review, setReview] = useState(initialReview);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newReview = { ...review };
        newReview[field] = value;
        setReview(newReview);
    }

    const handleOnSubmit = e => {
        const fullReview = {
            ...review,
            rating: value
        }
        fetch('https://salty-headland-52267.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fullReview)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Review posted successfully! Thanks for your feedback.');
                }
            });
        e.preventDefault();
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffa600', mb: 5 }} variant="h5">
                Write a Review. Give us your all important opinion.
            </Typography>
            <form onSubmit={handleOnSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    onBlur={handleOnBlur}
                    defaultValue={user.displayName}
                    sx={{ width: '400px', mb: 1 }}
                    size="small"
                />
                <br />
                <TextareaAutosize
                    name="reviewText"
                    onBlur={handleOnBlur}
                    aria-label="minimum height"
                    minRows={6}
                    placeholder="Write a review"
                    style={{ width: 400, marginBottom: '2px' }}
                />
                <br />
                <TextField
                    name="profession"
                    label="Profession"
                    variant="outlined"
                    onBlur={handleOnBlur}
                    sx={{ width: '400px', mb: 1 }}
                    size="small"
                />
                <br />
                <Typography component="legend">Rate<small>(select stars to rate)</small></Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <br />
                <Button sx={{ width: 400, fontWeight: 700 }} type="submit" color="warning" variant="contained">Submit Review</Button>
            </form>
        </Box>
    );
};

export default Review;