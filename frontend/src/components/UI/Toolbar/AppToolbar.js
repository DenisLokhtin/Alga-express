import React, {useEffect, useState} from 'react';
import Anonymous from "./Menu/Anonymous";
import './AppToolbar.css';
import {Button, Grid, IconButton, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";
import './AppToolbar.css';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./Menu/UserMenu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const AppToolbar = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);

    let renderComponent = (
        <Toolbar className="toolbar">
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Link to="/" className="homeLink">
                        Alga Express
                    </Link>
                </Grid>
                <Grid item>
                    <Button
                        sx={{borderColor: "#F5F5F7", color: "#F5F5F7",
                            '&:hover': {borderColor: "#F5F5F7"}}}
                        startIcon={<AccountBalanceWalletIcon/>}
                    >
                        765.0 сом
                    </Button>
                </Grid>
                <Grid item>
                    <Anonymous/>
                    {/*<UserMenu/>*/}
                </Grid>
            </Grid>
        </Toolbar>
    );

    if (width < 576) {
        renderComponent = (
            <Toolbar className="toolbar">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <IconButton
                            type="button"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>
                        </IconButton>
                        <BurgerMenu setOpen={setOpen} open={open}>
                            <Anonymous setOpen={setOpen}/>
                            {/*<UserMenu/>*/}
                        </BurgerMenu>
                    </Grid>`
                    <Grid item>
                        <Link to="/" className="homeLink">
                            Alga Express
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{borderColor: "#F5F5F7", color: "#F5F5F7",
                                '&:hover': {borderColor: "#F5F5F7"}}}
                            startIcon={<AccountBalanceWalletIcon/>}
                        >
                            765.0 сом
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        )
    }

    return renderComponent;
};

export default AppToolbar;