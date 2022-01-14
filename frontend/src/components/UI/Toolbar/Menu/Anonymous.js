import React, {useEffect, useState} from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import {Button, Grid, List, ListItem} from "@mui/material";
import "./Anonymous.css";
import {Link} from "react-router-dom";

const Anonymous = ({setOpen}) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });

        return () => {
            setWidth(window.innerWidth);
        }
    }, []);

    let renderComponent = (
        <Grid item>
            <Button
                className="btn"
                sx={{borderColor: "#F5F5F7", color: "#F5F5F7",marginLeft: "15px",
                    '&:hover': {borderColor: "#F5F5F7"}}}
                startIcon={<LoginIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>}
                variant="outlined"
                component={Link}
                to={'/login'}
            >
                Войти
            </Button>
            <Button
                className="btn"
                sx={{borderColor: "#F5F5F7", color: "#F5F5F7", marginLeft: "15px",
                    '&:hover': {borderColor: "#F5F5F7"}}}
                startIcon={<PersonAddIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>}
                variant="outlined"
                component={Link}
                to={'/register'}
            >
                Зарегистрироваться
            </Button>
        </Grid>
    );

    if (width < 576) {
        renderComponent = (
            <List>
                <ListItem sx={{display: "flex", justifyContent: "space-evenly"}}>
                    <Button
                        sx={{borderColor: "#F5F5F7", color: "#F5F5F7",
                            '&:hover': {borderColor: "#F5F5F7"}}}
                        startIcon={<LoginIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>}
                        variant="outlined"
                        component={Link}
                        to={'/login'}
                        onClick={() => setOpen(false)}
                    >
                        Войти
                    </Button>
                    <Button
                        sx={{borderColor: "#F5F5F7", color: "#F5F5F7",
                            '&:hover': {borderColor: "#F5F5F7"}}}
                        startIcon={<PersonAddIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>}
                        variant="outlined"
                        component={Link}
                        to={'/register'}
                        onClick={() => setOpen(false)}
                    >
                        Зарегистрироваться
                    </Button>
                </ListItem>
            </List>
        )
    }

    return renderComponent;
};

export default Anonymous;