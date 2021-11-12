import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ffa600',
    boxShadow: 24,
    p: 4,
};

const PurchaseModal = ({ bicycle, open, handleClose }) => {
    const { user } = useAuth();

    const initialInfo = { customerName: user.displayName, email: user.email, address: '', phone: '' }
    const [purchaseInfo, setPurchaseInfo] = React.useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...purchaseInfo };
        purchaseInfo[field] = value;
        console.log(purchaseInfo);
        setPurchaseInfo(newInfo);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography sx={{ color: 'warning.main', fontWeight: 700 }} id="transition-modal-title" variant="h5" component="h2">
                        {bicycle.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }} variant="h6">
                        Price: BDT<span style={{ color: '#ff6600', fontWeight: 700 }}>{bicycle.price}</span>/- only.
                    </Typography>

                    <form>
                        <TextField
                            sx={{ mt: 2, width: '100%' }}
                            id="outlined-textarea"
                            defaultValue={user.displayName}
                            name='customerName'
                            onBlur={handleOnBlur}
                            label="Your Name"
                            size="small"
                        />
                        <TextField
                            sx={{ mt: 2, width: '100%' }}
                            id="outlined-textarea"
                            defaultValue={user.email}
                            type="email"
                            name='email'
                            onBlur={handleOnBlur}
                            label="Your Email"
                            size="small"
                        />
                        <TextField
                            sx={{ mt: 2, width: '100%' }}
                            id="outlined-textarea"
                            type="address"
                            name='address'
                            onBlur={handleOnBlur}
                            label="Your Address"
                        />
                        <TextField
                            sx={{ mt: 2, width: '100%' }}
                            id="outlined-textarea"
                            type="number"
                            name='phone'
                            onBlur={handleOnBlur}
                            label="Phone Number"
                            size="small"
                        />
                        <Button type="submit" sx={{ mt: 2, px: 4, float: 'right', backgroundColor: 'warning.main' }} variant="contained">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default PurchaseModal;
