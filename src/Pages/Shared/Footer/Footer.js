import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <Box sx={{ position: 'absolute', bottom: 0, backgroundColor: '#1c1d1f', width: '100%', textAlign: 'center', color: 'white', mt: 20 }}>
            <Typography sx={{ fontStyle: 'italic', my: 1 }}>
                Get a bicycle. You will not regret it, if you live. But SAFETY should always first priority. Maintain Safety, Enjoy Ride, Live Healthy.
            </Typography>
            <small>Contact @ any need any time: +880-1939-632694, +031-333333333, +880-1646-217107</small>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }} className="footerItem">
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Link sx={{ color: 'white' }} href="#" underline="always">
                        Terms & Conditions
                    </Link>
                    <Link sx={{ color: 'white' }} href="#" underline="always">
                        Privacy Policy
                    </Link>
                    <Link sx={{ color: 'white' }} href="#" underline="always">
                        Riding Guide
                    </Link>
                    <Link sx={{ color: 'white' }} href="#" underline="always">
                        Contact us
                    </Link>
                    <Link sx={{ color: 'white' }} href="#" underline="always">
                        About us
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center   ' }} className="footerIcon">
                    <Box>
                        <p style={{ marginBottom: '5px', fontStyle: 'italic' }}>Follow us on</p>
                        <Link sx={{ color: 'white', fontSize: 24, mr: 2 }} href="https://www.fb.com" underline="always">
                            <i className="fab fa-facebook-square"></i>
                        </Link>
                        <Link sx={{ color: 'white', fontSize: 24, mr: 2 }} href="https://www.linkedin.com" underline="always">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link sx={{ color: 'white', fontSize: 24, mr: 2 }} href="https://www.twitter.com" underline="always">
                            <i className="fab fa-twitter-square"></i>
                        </Link>
                        <Link sx={{ color: 'white', fontSize: 24, mr: 2 }} href="https://www.instagram.com" underline="always">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link sx={{ color: 'white', fontSize: 24, mr: 2 }} href="https://www.youtube.com" underline="always">
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{ fontSize: '12px', my: 3 }}>
                Copyright &copy; 2021 @ Bicycle Universe - your bicycle KINGDOM. All right reserved. Presented by shahriarAb.
            </Typography>
        </Box>
    );
};

export default Footer;