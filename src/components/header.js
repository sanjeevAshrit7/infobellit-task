import { makeStyles } from '@material-ui/core';
import { Menu } from '@mui/icons-material';
import { AppBar, Avatar, Box, CssBaseline, Dialog, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

import { contacts, images, navData, navDataMini } from '../utils/commonComponents';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialog, setDialog] = useState(false);
    
    const classes = useStyles();
    const userState = useSelector((state) => state.loginUser);
    const navigate = useNavigate();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const handleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen);
    };

    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    };

    const location = usePathname();

    console.log('loc', location, location === '/')

    if (isTabletOrMobile) {
        return (
            <header className={`py-7 bg-blue-50 ${location === '/' ? 'hidden' : ''}`}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar position="fixed" style={{ backgroundColor: '#e6f7ff' }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                            >
                                <Menu htmlColor='black' />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div" className='text-red-800'>
                                Book My Train
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        anchor='left'
                        variant="temporary"
                        open={drawerOpen}
                        onClose={handleDrawerOpen}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                        }}
                    >
                        <div style={{ width: '30vh' }} className={'h-full'}>
                            <div className={classes.toolbar} style={{ marginTop: '1rem' }} >
                                <img
                                    src={images.logo}
                                    className="w-3/4 h-fit mx-5"
                                    alt="logo"
                                />
                            </div>
                            <nav className="inline-flex self-center flex-1 items-center flex-col justify-center grid grid-cols-1 place-content-center justify-center">
                                {navDataMini.map((item) => {
                                    return (
                                        <NavLink
                                            key={item?.id}
                                            to={item?.to}
                                            className={item?.style}>
                                            {item?.name}{item?.id === 2 ? `  (${userState?.myTickets.length})`: ''}
                                        </NavLink>
                                    )
                                })}
                            </nav>
                        </div>
                    </Drawer>
                </Box>
            </header>
        )
    } else {
        return (
            <header className={`drop-shadow-md bg-blue-50 px-20 ${location === '/' ? 'hidden' : ''}`}>
                <div className={'container mx-auto flex justify-start'}>
                    <div
                        onClick={() => {
                            navigate('/')
                        }}
                        className={'flex flex-col justify-center'}
                    >
                        <img src={images.logo} className={'self-center h-20 max-w-50 min-w-50'} alt={'NA'} />
                    </div>
                    <nav className="inline-flex self-center flex-1 justify-center">
                        {navData?.map((item, index) => {
                            if (item?.id !== 4) {
                                return (
                                    <NavLink
                                        style={{ maxWidth: '16%', minWidth: '16%', textDecorationThickness: '3.19px' }}
                                        key={item?.id}
                                        to={item?.to}
                                        className={item?.style}
                                    >
                                        {item?.name}
                                        {/* {item?.id === 2 ? `  (${userState?.myTickets.length})` : ''} */}
                                    </NavLink>
                                );
                            } else {
                                return (
                                    <NavLink
                                        style={{ maxWidth: '16%', minWidth: '16%', textDecorationThickness: '3.19px' }}
                                        key={item?.id}
                                        // to={item?.to}
                                        className={item?.style}
                                        onClick={() => {
                                            setDialog(true)
                                        }}
                                    >
                                        {item?.name}
                                    </NavLink>
                                );
                            }
                        })}
                    </nav>
                    <div className='inline-flex py-3 px-3 my-6 self-end'>
                        <SocialIcon url='https://twitter.com' className='mr-4' target={'_blank'} fgColor={'#fff'} style={{ height: 35, width: 35 }} />
                        <SocialIcon url='https://www.instagram.com' className='mr-4' target={'_blank'} fgColor={'#fff'} style={{ height: 35, width: 35 }} />
                        <SocialIcon url='https://www.linkedin.com' className='mr-4' target={'_blank'} fgColor={'#fff'} style={{ height: 35, width: 35 }} />
                    </div>
                </div>
                <Dialog onClose={() => {setDialog(!dialog)}} open={dialog}>
                    <DialogTitle className='self-center'>Contact us at</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        {contacts?.map((item) => {
                            return (
                                <ListItem className={item?.id % 2 === 0 ? 'bg-red-100' : 'bg-green-100'}>
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText primary={item?.name} className='font-bold' />
                                </ListItem>
                            );
                        })}
                    </List>
                </Dialog>
            </header>
        )
    }
}

export default Header