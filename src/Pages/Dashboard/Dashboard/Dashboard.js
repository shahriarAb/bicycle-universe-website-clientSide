import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Switch,
    Route,
    useRouteMatch,
    NavLink
} from "react-router-dom";
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import Payment from '../Payment/Payment';
import DashboardHome from '../DashboardHome/DashboardHome';
import Myorder from '../Myorder/Myorder';
import Review from '../Review/Review';

const drawerWidth = 250;

const Dashboard = (props) => {
    const { window } = props;
    const { logOut } = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', ml: 4, mb: 10 }}>
                    <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`${url}`}><Button sx={{ fontWeight: 700 }} color="inherit"><i style={{ marginRight: '10px' }} className="far fa-list-alt"></i> Dashboard</Button></NavLink>
                    <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`${url}/payment`}><Button sx={{ fontWeight: 700 }} color="inherit"><i style={{ marginRight: '10px' }} className="far fa-credit-card"></i> Payment</Button></NavLink>
                    <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`${url}/myOrders`}><Button sx={{ fontWeight: 700 }} color="inherit"><i style={{ marginRight: '10px' }} className="fas fa-shopping-bag"></i> My Orders</Button></NavLink>
                    <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`${url}/review`}><Button sx={{ fontWeight: 700 }} color="inherit"><i style={{ marginRight: '10px' }} className="fas fa-star-half-alt"></i> Write a Review</Button></NavLink>
                </Box>
                <Divider />
                <NavLink style={{ color: 'black', textDecoration: 'none' }} to="/Home"><Button sx={{ fontWeight: 700 }} color="inherit"><i style={{ marginRight: '10px' }} className="fas fa-house-user"></i> Home</Button></NavLink>
                <br />
                <Button onClick={logOut} sx={{ fontWeight: 700 }} color="inherit" variant="text"><i style={{ marginRight: '10px' }} className="fas fa-sign-out-alt"></i> Logout</Button>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#263238'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ fontWeight: 600 }} variant="h5" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={path}>
                        <DashboardHome></DashboardHome>
                    </Route>
                    <Route exact path={`${path}/payment`}>
                        <Payment></Payment>
                    </Route>
                    <Route exact path={`${path}/myOrders`}>
                        <Myorder></Myorder>
                    </Route>
                    <Route exact path={`${path}/review`}>
                        <Review></Review>
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
