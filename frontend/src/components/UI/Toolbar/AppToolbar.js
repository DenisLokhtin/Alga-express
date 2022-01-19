import React, {useEffect, useState} from 'react';
import Anonymous from "./Menu/Anonymous";
import './AppToolbar.css';
import {Button, Grid, IconButton, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./Menu/UserMenu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {useSelector} from "react-redux";
import logo from '../../../assets/logo.svg';

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    const [width, setWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);

    let renderComponent = (
        <Toolbar className="toolbar">
            <Grid container justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <Link to="/">
                        <img src={logo} alt="logo" style={{width: "40px"}}/>
                    </Link>
                </Grid>
                <Grid item>
                    {
                        user
                            ? <UserMenu setOpen={setOpen}/>
                            : <Anonymous/>
                    }
                </Grid>
            </Grid>
        </Toolbar>
    );

    if (width < 900) {
        renderComponent = (
            <Toolbar className="toolbar">
                <Grid container alignItems="center">
                    <Grid item xs={4} display={"flex"} justifyContent={"flex-start"}>
                        <IconButton
                            type="button"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>
                        </IconButton>
                        <BurgerMenu setOpen={setOpen} open={open}>
                            {
                                user && <UserMenu setOpen={() => setOpen(false)}/>
                            }
                        </BurgerMenu>
                    </Grid>
                    <Grid item xs={4} display={"flex"} justifyContent={"center"}>
                        <Link to="/">
                            <img src={logo} alt="logo" style={{width: "40px"}}/>
                        </Link>
                    </Grid>
                    <Grid item xs={4} display={"flex"} justifyContent={"flex-end"}>
                        {
                            user ?
                                <Button
                                    sx={{borderColor: "#F5F5F7", color: "#F5F5F7", '&:hover': {borderColor: "#F5F5F7"}}}
                                    startIcon={<AccountBalanceWalletIcon/>}
                                    variant={"text"}
                                >
                                    {user.user.balance + ' сом'}
                                </Button> : <Anonymous/>
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        )
    }

    return renderComponent;
};

export default AppToolbar;