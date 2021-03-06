import { Alert, AlertTitle, CircularProgress } from '@mui/material';
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
import Header from '../Shared/Header/Header';

const BicycleDetails = () => {
    const { id } = useParams();
    const [bicycle, setBicycle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [orderSuccess, setOrderSuccess] = React.useState(false);
    document.title = "Bicycle Details - Bicycle Universe"

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://salty-headland-52267.herokuapp.com/bicycle/${id}`)
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
        <div>
            <Header />
            <Box sx={{ mt: 11, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ maxWidth: '45%', boxShadow: 4 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        width="100%"
                        image={bicycle.img}
                    />
                    {orderSuccess && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your order has been successfully recieved.
                    </Alert>}
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
                    setOrderSuccess={setOrderSuccess}
                ></PurchaseModal>
            </Box>
        </div>
    );
};

export default BicycleDetails;