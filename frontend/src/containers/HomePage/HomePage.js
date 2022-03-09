import React, {useEffect, useRef} from 'react';
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import Pic from "../../assets/main-pic.jpeg";
import {Card, CardMedia, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Container from "@mui/material/Container";
import theme from "../../theme";
import NewsPanel from "../../components/NewsPanel/NewsPanel";
import Carousel from "../../components/Carousel/Carousel";

const useStyles = makeStyles({
    block: {
        backgroundImage: `url(${Pic})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        textAlign: "center",
        padding: "400px 0 50px 0",
        margin: "0",
        color: "white",
    },
    list: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        '@media (max-width: 900px)': {
            flexDirection: "column",
        }
    },
});

const HomePage = () => {
    const classes = useStyles();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
    }, [messagesEndRef]);

    return (
        <Grid ref={messagesEndRef} container flexDirection="column" spacing={2}>
            <Grid item lg={12}>
                <h1 className={classes.block}>
                    Служба доставки из Турции и Сша
                </h1>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Grid item>
                        <Container style={{textAlign: 'center'}}>
                            <Carousel/>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={10}>
                    <Grid item>
                        <Container style={{textAlign: 'center'}}>
                            <h2 style={theme.title}>Почему мы ?</h2>
                            <List className={classes.list}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccessTimeIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Отправка груза 2 раза в неделю"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SpeedIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Быстрая доставка"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ThumbUpAltIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Качественная услуга"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PriceCheckIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Лучшие цены"/>
                                </ListItem>
                            </List>
                        </Container>
                    </Grid>
                    <Grid item>
                        <Container style={{textAlign: 'center'}}>
                            <h2 className={classes.title}>Выкуп для вас !</h2>
                            <div style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                                <Card sx={{width: "200px", marginBottom: "20px"}}>
                                    <CardMedia
                                        component="img"
                                        image={"https://logowik.com/content/uploads/images/trendyolcom2977.jpg"}
                                        height="100px"
                                    />
                                </Card>
                                <Card sx={{width: "200px", marginBottom: "20px"}}>
                                    <CardMedia
                                        component="img"
                                        image={"https://thumbs.dreamstime.com/b/amazon-logo-editorial-vector-illustration-market-136495269.jpg"}
                                        height="100px"
                                    />
                                </Card>
                                <Card sx={{width: "200px", marginBottom: "20px"}}>
                                    <CardMedia
                                        component="img"
                                        image={"https://i1.wp.com/sportsfinding.com/wp-content/uploads/2020/02/nike-swoosh-wikipedia.jpg?fit=580%2C350&ssl=1&resize=1280%2C720"}
                                        height="100px"
                                    />
                                </Card>
                                <Card sx={{width: "200px", marginBottom: "20px"}}>
                                    <CardMedia
                                        component="img"
                                        image={"https://assets.turbologo.com/blog/en/2019/07/19085123/The-Trefoil-adidas-logo-1.jpg"}
                                        height="100px"
                                    />
                                </Card>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
                <NewsPanel/>
            </Grid>
        </Grid>
    );
};

export default HomePage;