import React, {useState} from 'react';
import {
    Box,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
    Toolbar
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles({
    paper: {
        width: '100%',
        height: '100%',
        zIndex: 99,
        color: '#F5F5F7',
    },
})

const BurgerMenu = ({pages}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setOpen(true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>

            <SwipeableDrawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        height: '100%' ,
                        width: '70vw',
                        boxSizing: 'border-box',
                        background: '#424245',
                    },}}
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => {}}
            >
                <Box
                    className={classes.paper}
                    onKeyDown={() => setOpen(false)}
                >
                    <Box>
                        <Toolbar sx={{background: 'grey'}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => setOpen(false)}
                                color="inherit"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </Box>

                    <Box>
                        <List>
                            {pages.map(item => (
                                <ListItemButton
                                    key={item.title}
                                    sx={{color: "#F5F5F7"}}
                                    component={Link}
                                    to={item.url}
                                    onClick={() => setOpen(false)}
                                >
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon sx={{color: "#F5F5F7"}}/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {item.title}
                                    </ListItemText>
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default BurgerMenu;