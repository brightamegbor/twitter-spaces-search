import { Fragment, useState} from "react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import MailIcon from '@mui/icons-material/ContactSupportOutlined';
import MoneyIcon from '@mui/icons-material/MoneyOutlined';
import NotificationIcon from '@mui/icons-material/NotificationsOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import TravelExploreIcon from '@mui/icons-material/TravelExploreOutlined'
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBarLarge = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerLarge = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function SideDrawer(props) {

    // const { window } = props;

    const [mobileOpen, setMobileOpen] = useState(false);

    const themelg = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerOpenClose = () => {
        setOpen(!open);
    };
    const { asPath, pathname } = useRouter();


    const drawer = (
        <Fragment>
            {/* <Toolbar /> */}
            <Box sx={{ overflow: 'hidden', height: '100%' }}>
                <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                        <List>
                            {[{name: 'Spaces', path: "/"}, {name: 'My Tweets', path: "/tweets"}, 
                            {name: 'Who Unfollowed Me', path: "/who"}].map((text, index) => (
                                <Link href={text.path} key={text.name}>
                                    <ListItem button selected={text.path === asPath}>
                                        <ListItemIcon>
                                            {index === 0 ? <TravelExploreIcon /> :
                                                index === 1 ? <AccountBalanceIcon /> :
                                                    index === 2 ? <MoneyIcon /> : <NotificationIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text.name} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['About', 'Contact'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InfoIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>

                    <div className="mt-auto">
                        <List>
                            {['Log out'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <LogoutIcon />
                                            : <LogoutIcon />
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </Box>
        </Fragment>
    );

    const container = typeof window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex', height: '100vh'}}>
            <CssBaseline />
            <AppBar position="fixed"
                color="inherit"
                elevation={1}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    display: { sm: 'none' }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        // display: {sm: 'none' }
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        {asPath === "/" ? "Twitter Spaces" 
                            : asPath === "/tweets" ? "My Tweets" : "Followers Check"}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* appbar desktop */}
            <AppBarLarge position="fixed"
                elevation={1}
                color="inherit"
                sx={{ display: { xs: 'none', sm: 'block' } }}
                open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpenClose}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {asPath === "/" ? "Twitter Spaces" 
                        : asPath === "/tweets" ? "My Tweets" : "Followers Check"}
                    </Typography>
                </Toolbar>
            </AppBarLarge>

            {/* // drawer mobile */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}>
                <Toolbar />
                {drawer}
            </Drawer>

            {/* drawer desktop */}
            <DrawerLarge
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    // '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerOpenClose}>
                        {themelg.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {drawer}
            </DrawerLarge>

            <Box component="main" className="container">
                <Toolbar className="top-toolbar" />
                {props.children}
            </Box>
        </Box>
    )
}


export default SideDrawer