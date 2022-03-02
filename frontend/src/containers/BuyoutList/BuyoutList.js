import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest} from "../../store/actions/buyoutActions";
import {Card, CardMedia, Container, Grid} from "@mui/material";
import MaterialLink from '@mui/material/Link'
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";
import {editBuyout, newPackageRegister} from "../../paths";
import {Link} from "react-router-dom";



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
    }
});


const BuyoutList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const buyouts = useSelector(state => state.buyouts.buyouts.data);


    useEffect(() => {
        dispatch(fetchBuyoutsRequest());
    }, [dispatch]);

    return (
        <Container>
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
                                    <MaterialLink href={b.url} target={'_blank'} rel={'noopener'} className={classes.btn}>
                                        Ссылка на товар</MaterialLink>
                                </Grid>
                                <Grid item>
                                    {user && user.role === 'admin' && (
                                        <Link
                                            to={newPackageRegister} state={{userProps: {id: b.user._id, name: b.user.name, email:b.user.email}}}
                                            className={classes.btn}
                                        >
                                            Оформить выкуп
                                        </Link>
                                    )}
                                </Grid>
                                <Grid item>
                                    {user && user.role === 'superAdmin' && (
                                        <Link
                                            to={newPackageRegister} state={{userProps: {id: b.user._id, name: b.user.name}}}
                                            className={classes.btn}
                                        >
                                            Оформить выкуп
                                        </Link>
                                    )}
                                </Grid>
                                <Grid item>
                                    {user && user.role === 'admin' && (
                                        <Link to={editBuyout.slice(0, editBuyout.length - 3) + b._id} className={classes.btn}>Редактировать выкуп</Link>
                                    )}
                                </Grid>
                                <Grid item>
                                    {user && user.role === 'superAdmin' && (
                                        <Link to={editBuyout.slice(0, editBuyout.length - 3) + b._id} className={classes.btn}>Редактировать выкуп</Link>
                                    )}
                                </Grid>

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