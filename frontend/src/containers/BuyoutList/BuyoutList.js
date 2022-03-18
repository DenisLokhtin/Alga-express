import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest} from "../../store/actions/buyoutActions";
import {Card, CardMedia, Container, Grid} from "@mui/material";
import MaterialLink from '@mui/material/Link'
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";
import {editBuyout, newPackageRegister} from "../../paths";
import {Link} from "react-router-dom";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles({
    card: {
        padding: '10px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    btn: {
        border: "2px solid darkgrey",
        padding: "5px 15px",
        backgroundColor: "white",
        textDecoration: "none",
    },

    breakpoints: {
        values: {
            sm: 767,
        },
    },

    container: {
        textAlign: 'center',
        paddingTop: '175px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '115px',
        },
    }
});

const BuyoutList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const buyouts = useSelector(state => state.buyouts.buyouts);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        dispatch(fetchBuyoutsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchBuyoutsRequest())
    }, [messagesEndRef, dispatch]);

    return (
        <Container ref={messagesEndRef} className={classes.container}>
            <Grid container>
                {buyouts && buyouts.map(b => (
                    <Grid item xs={8} sm={6} md={4} lg={3} key={b._id}>
                        <Card className={classes.card}>
                            <CardMedia
                                image={apiURL + '/' + b.image}
                                className={classes.media}
                            />
                            <p>{b.description}</p>
                            {user && user.role === 'admin' && (
                                <p>Заказчик: {b.user.name}</p>
                            )}
                            {user && user.role === 'superAdmin' && (
                                <p>Заказчик: {b.user.name}</p>
                            )}
                            <Grid container direction={"column"} spacing={2}>
                                <Grid item>
                                    <MaterialLink href={b.url} target={'_blank'} rel={'noopener'}
                                                  className={classes.btn}>
                                        Ссылка на товар</MaterialLink>

                                    {b.status === 'NEW' && (
                                        <p className={classes.btn}>В обработке</p>
                                    )}
                                    {b.status === 'ORDERED' && (
                                        <p className={classes.btn}>Заказан</p>
                                    )}
                                    {b.status === 'ACCEPTED' && (
                                        <p className={classes.btn}>Принят</p>
                                    )}
                                </Grid>


                                {user && user.role === 'admin' && (
                                    <Grid item>
                                        {b.status === 'NEW' && (
                                            <Link
                                                to={newPackageRegister} state={{
                                                userProps: {
                                                    id: b.user._id,
                                                    name: b.user.name,
                                                    email: b.user.email,
                                                    buyoutId: b._id
                                                }
                                            }}
                                                className={classes.btn}
                                            >
                                                Оформить выкуп
                                            </Link>
                                        )}

                                        {/*{b.status === 'ORDERED' && (*/}
                                        {/*    <p className={classes.btn}>Заказан</p>*/}
                                        {/*)}*/}
                                    </Grid>
                                )}

                                    {user && user.role === 'superAdmin' && (
                                        <Grid item>
                                            {b.status === 'NEW' && (
                                                <Link
                                                    to={newPackageRegister} state={{
                                                    userProps: {
                                                        id: b.user._id,
                                                        name: b.user.name,
                                                        email: b.user.email,
                                                        buyoutId: b._id
                                                    }
                                                }}
                                                    className={classes.btn}
                                                >
                                                    Оформить выкуп
                                                </Link>
                                            )}

                                            {/*{b.status === 'ORDERED' && (*/}
                                            {/*    <p className={classes.btn}>Заказан</p>*/}
                                            {/*)}*/}
                                        </Grid>
                                    )}

                                {user && user.role === 'admin' && (
                                <Grid item>
                                    {b.status === 'NEW' && (
                                        <Link to={editBuyout.slice(0, editBuyout.length - 3) + b._id}
                                              className={classes.btn}>Редактировать выкуп</Link>
                                    )}
                                    {b.status === 'ACCEPTED' && (
                                        <p className={classes.btn}>Принят</p>
                                    )}

                                </Grid>
                                )}
                                {user && user.role === 'superAdmin' && (
                                    <Grid item>
                                        {b.status === 'NEW' && (
                                            <Link to={editBuyout.slice(0, editBuyout.length - 3) + b._id}
                                                  className={classes.btn}>Редактировать выкуп</Link>
                                        )}
                                        {b.status === 'ACCEPTED' && (
                                            <p className={classes.btn}>Принят</p>
                                        )}

                                    </Grid>
                                )}

                                {/*Временный link надо его на странице админа где нибудь*/}
                                <Grid item>
                                    {user && user.role === 'admin' && (
                                        <Link
                                            to={newPackageRegister}
                                            className={classes.btn}
                                        >
                                            Создать посылку
                                        </Link>
                                    )}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BuyoutList;