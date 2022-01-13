import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    paper: {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px',
    },
}));

const Contacts = () => {
    const classes = useStyles();

    return (
        <Container style={{'border': '2px solid grey', 'borderRadius': '3px', 'background': '#FAFAFA'}} component='div'>
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Контакты
                </Typography>
            </div>
            <Grid component='div'>
                <div>
                    <Typography style={{'fontWeight': 'Bold'}} component="p">
                        Бишкек
                    </Typography>
                    <Typography component="p">
                        Юнусалиева, 142
                    </Typography>
                    <Typography component="p">
                        Тел.: 0 774 769 434 (Выкуп), ️0 702 465 333 (Склад)
                    </Typography>
                    <Typography component="p">
                        <Link href="https://api.whatsapp.com/send?phone=996774769434" component="a">WhatsApp</Link>
                    </Typography>
                    <Typography component="p">
                        <Link href="https://www.instagram.com/alga_express/" component="a">Instagram</Link>
                    </Typography>
                    <Typography component="div">
                        <Typography component="p">
                           График работы:
                        </Typography>
                        <ul style={{'margin': '0px'}}>
                            <li>Пн: 11:00-18:00</li>
                            <li>Вт: 11:00-18:00</li>
                            <li>Ср: 11:00-18:00</li>
                            <li>Чт: Выходной</li>
                            <li>Пт: 11:00-18:00</li>
                            <li>Сб: 10:00-18:00</li>
                            <li>Вс: 11:00-15:00</li>
                        </ul>
                    </Typography>
                    <Typography style={{'fontWeight': 'Bold'}} component="p">
                       Склад в Китае
                    </Typography>
                    <Typography style={{'fontWeight': 'Bold'}} component="p">
                       Склад в Турции
                    </Typography>
                    <Typography style={{'fontWeight': 'Bold'}} component="p">
                       Склад в США
                    </Typography>
                </div>
            </Grid>
        </Container>
    )
};

export default Contacts;