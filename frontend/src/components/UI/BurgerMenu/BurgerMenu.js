import React from 'react';
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

const useStyles = makeStyles({
    paper: {
        width: '80vw',
        height: '100%',
        zIndex: 99,
        color: '#F5F5F7'
    },
    contentPaper: {
        background: '#424245',
        width: '100%',
        height: '100%'
    }
})

const BurgerMenu = ({open, setOpen, pages}) => {
    const classes = useStyles();

    return (
        <SwipeableDrawer
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
                    <Toolbar sx={{background: 'rgba(0,0,0,0.82)'}}>
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

                <Box className={classes.contentPaper}>
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
    );
};

export default BurgerMenu;