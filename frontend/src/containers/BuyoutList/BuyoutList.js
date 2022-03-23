import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest} from "../../store/actions/buyoutActions";
import {Card, CardMedia, Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";
import {editBuyout, newPackageRegister} from "../../paths";
import {Link} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 430,
            sm: 767,
        },
    },
});

const useStyles = makeStyles({
    breakpoints: {
        values: {
            xs: 430,
            sm: 767,
        },
    },

    card: {
        margin: '10px',
        [theme.breakpoints.down('xs')]: {
            margin: '5px',
        },
    },

    customerBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 10px',
    },

    description: {
        lineHeight: '28px',
    },

    customer: {
        fontWeight: '500',
        padding: '10px',
        marginBottom: '0',
    },

    media: {
        height: 0,
        paddingTop: '56.25%'
    },

    productLink : {
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: 'bold',
        padding: "10px 15px",
        textDecoration: "underline",
        background: '#6A5ACD',
        color: '#fff',
        marginTop: '15px',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            fontSize: '15px',
        },
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            fontSize: '12px',
            padding: '12px',
            justifyContent: 'space-between',
        },
    },

    btnInfo: {
        display: 'flex',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        background: '#745296',
        color: '#fff',
        padding: '10px',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            fontSize: '14px',
        },
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            fontSize: '12px',
            justifyContent: 'space-between',
        },
    },

    linkBtn: {
        display: 'flex',
        background: '#2A8D9C',
        color: '#fff',
        fontWeight: 'bold',
        justifyContent: 'space-around',
        textDecoration: 'none',
        padding: '15px',
        transition: 'all .3s ease',
        // width: '99%',

        '&:hover': {
            borderRadius: '13px',
            [theme.breakpoints.down('xs')]: {
                borderRadius: 'none',
            },
        },


        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            fontSize: '14px',
            padding: '12px',
        },
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            fontSize: '12px',
            justifyContent: 'space-between',
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
                    <Grid item xs={6} sm={6} md={4} lg={3} key={b._id}>
                        <Card className={classes.card}>
                            <CardMedia
                                image={apiURL + '/' + b.image}
                                className={classes.media}
                            />
                            {(user?.role === 'admin' || user?.role === 'superAdmin') && (
                                <div className={classes.customerBlock}>
                                    <span>Заказчик</span>
                                    <ArrowDownwardIcon/>
                                    <p className={classes.customer}>{b.user.name}</p>
                                </div>
                            )}
                            <Grid container direction={"column"} spacing={2}>
                                <Grid item xs={12} sm={6} md={6} >
                                    <a href={b.url} target={'_blank'} rel={'noopener'}
                                                  className={classes.productLink}>
                                        <ProductionQuantityLimitsIcon/>
                                        Ссылка на товар
                                    </a>
                                    {b.status === 'NEW' && (
                                        <p className={classes.btnInfo}>
                                            <span>Статус</span>
                                            <ArrowForwardIcon sx={{
                                                fontSize: {
                                                    xs: '17px',
                                                    sm: '20px',
                                                    md: '24px',
                                                }
                                            }}/>
                                            В обработке
                                        </p>
                                    )}
                                    {b.status === 'ORDERED' && (
                                        <p className={classes.btnInfo}>
                                            <span>Статус</span>
                                            <ArrowForwardIcon sx={{
                                                fontSize: {
                                                    xs: '17px',
                                                    sm: '20px',
                                                    md: '24px',
                                                }
                                            }}/>
                                            Заказан
                                        </p>
                                    )}
                                    {b.status === 'ACCEPTED' && (
                                        <p className={classes.btnInfo}>
                                            <span>Статус</span>
                                            <ArrowForwardIcon sx={{
                                                fontSize: {
                                                    xs: '17px',
                                                    sm: '20px',
                                                    md: '24px',
                                                }
                                            }}/>
                                            Принят
                                        </p>
                                    )}
                                </Grid>
                                {user && (user.role === 'admin' || user?.role === 'superAdmin') && (
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
                                                className={classes.linkBtn}>
                                                <AddShoppingCartIcon sx={{
                                                    fontSize: {
                                                        xs: '17px',
                                                        sm: '20px',
                                                        md: '24px',
                                                    }
                                                }}/>
                                                Оформить выкуп
                                            </Link>
                                        )}

                                        {/*{b.status === 'ORDERED' && (*/}
                                        {/*    <p className={classes.btn}>Заказан</p>*/}
                                        {/*)}*/}
                                    </Grid>
                                )}
                                {user && (user?.role === 'admin' || user?.role === 'superAdmin') && (
                                    <Grid item xs={12}>
                                        {b.status === 'NEW' && (
                                            <Link to={editBuyout.slice(0, editBuyout.length - 3) + b._id}
                                                  className={classes.linkBtn}>
                                                <ModeEditIcon sx={{
                                                    fontSize: {
                                                        xs: '17px',
                                                        sm: '20px',
                                                        md: '24px',
                                                    }
                                                }}/>
                                                Редактировать выкуп
                                            </Link>
                                        )}
                                        {b.status === 'ACCEPTED' && (
                                            <p className={classes.productLink}>Принят</p>
                                        )}

                                    </Grid>
                                )}
                                {/*Временный link надо его на странице админа где нибудь*/}
                                <Grid item xs={12}>
                                    {user && (user?.role === 'admin' || user?.role === 'superAdmin') && (
                                        <Link
                                            to={newPackageRegister}
                                            className={classes.linkBtn}
                                        >
                                            <AddIcon sx={{
                                                fontSize: {
                                                    xs: '17px',
                                                    sm: '20px',
                                                    md: '24px',
                                                }
                                            }}/>
                                            Создать посылку
                                        </Link>
                                    )}
                                </Grid>
                            </Grid>
                            <p className={classes.description}>{b.description}</p>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BuyoutList;