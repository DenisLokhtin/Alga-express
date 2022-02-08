import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBuyoutsRequest} from "../../store/actions/buyoutActions";
import {Card, CardMedia, Container, Grid, Link} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../config";



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

    console.log(buyouts)


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
                            <Link href={b.url} target={'_blank'} rel={'noopener'} className={classes.btn}>
                           Ссылка на товар</Link>


                            {/*{showBtn && (*/}
                            {/*    <button onClick={()=>dispatch(deletePicture(id))}>X</button>*/}
                            {/*)}*/}
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