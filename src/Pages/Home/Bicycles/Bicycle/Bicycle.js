import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useHistory } from 'react-router';

const Bicycle = props => {
    const { _id, name, img, description, price } = props.bicycle;
    const history = useHistory();

    const handleDetails = () => {
        const url = `/bicycle/${_id}`;
        history.push(url);
    }

    return (
        <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 4 }}>
                <img width="100%" height="280" src={img} alt="" />
                <CardContent>
                    <Typography sx={{ fontWeight: 700 }} gutterBottom variant="h5" component="div">
                        {name.slice(0, 20)}
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }} variant="body2" color="text.secondary">
                        {description.slice(0, 140)}...
                    </Typography>
                    <Typography sx={{ textAlign: 'left', mt: 1 }} variant="h6">
                        Price: BDT{price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleDetails} sx={{ px: 6, fontWeight: 700 }} variant="contained" color="warning">Buy Now</Button>
                    {props.children}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Bicycle;