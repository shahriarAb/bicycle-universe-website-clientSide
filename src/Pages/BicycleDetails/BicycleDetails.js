import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PurchaseModal from '../PurchaseModal/PurchaseModal';

const BicycleDetails = () => {
    const { id } = useParams();
    const [bicycle, setBicycle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5500/bicycle/${id}`)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setBicycle(data);
            });
    }, [id]);

    if (isLoading) {
        return (
            <Box sx={{ mt: 7 }}>
                <CircularProgress />
                <h5>Loading...</h5>
            </Box>
        );
    }
    return (
        <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: '45%', boxShadow: 4 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    width="100%"
                    image={bicycle.img}
                />
                <CardContent>
                    <Typography sx={{ fontWeight: 700 }} gutterBottom variant="h5" component="div">
                        {bicycle.name}
                    </Typography>
                    <Typography variant="body">
                        {bicycle.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Button
                        onClick={handleOpen}
                        sx={{ px: 4, fontWeight: 600 }}
                        variant="contained"
                        color="warning"
                    ><i className="fab fa-opencart"></i> Purchase Now</Button>
                </CardActions>
            </Card>
            <PurchaseModal
                bicycle={bicycle}
                open={open}
                handleClose={handleClose}
            ></PurchaseModal>
        </Box>
    );
};

export default BicycleDetails;