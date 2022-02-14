import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest} from "../../store/actions/buyoutActions";
import {Card, CardMedia, Container, Grid} from "@mui/material";
import MaterialLink from '@mui/material/Link'
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";
import {newPackageRegister} from "../../paths";
import {Link} from "react-router-dom";



const useStyles = makeStyles({
    card: {
        height: '100%',
        textAlign: "center",
        padding: '10px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    btn: {
        border: "2px solid darkgrey",
        padding: "5px 15px",
        backgroundColor: "white"
    }
})


const BuyoutList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const buyouts = useSelector(state => state.buyouts.buyouts.data);


    useEffect(() => {
        dispatch(fetchBuyoutsRequest())
    }, [dispatch])

    return (
        <Container>
            <Grid container>
                {buyouts && buyouts.map(b => (
                    <Grid item xs={8} sm={6} md={4} lg={2} key={b._id}>
                        <Card className={classes.card}>
                            <CardMedia
                                image={apiURL + '/' + b.image}
                                className={classes.media}
                            />
                            <p>{b.description}</p>
                            {user && user.role === 'admin' && (
                                <p>Заказчик: {b.user.name}</p>
                            )}
                            <MaterialLink href={b.url} target={'_blank'} rel={'noopener'} className={classes.btn}>
                           Ссылка на товар</MaterialLink>
                            {user && user.role === 'admin' && (
                                <Link to={newPackageRegister} state={{userProps: {id: b.user._id, name: b.user.name}}}>Оформить выкуп</Link>
                            )}

                        </Card>
                        {/*//     <h4>{b.url}</h4>*/}
                        {/*//     <h4>{b.description}</h4>*/}
                        {/*//     <img src={apiURL+'/'+b.image} alt={'product pic'} style={{width: '100px'}}/>*/}
                        {/*// </>*/}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BuyoutList;