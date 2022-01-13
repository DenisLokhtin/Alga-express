import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const AboutUs = () => {
    const classes = useStyles();

    return (
        <Container style={{'border': '2px solid grey', 'borderRadius': '3px', 'background': '#FAFAFA'}} component='div'>
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    О нас
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
                       Телефон: 0 774 769 434(Выкуп), ️0 702 465 333(Склад)
                    </Typography>
                    <Link href="https://api.whatsapp.com/send?phone=996774769434" component="a">WhatsApp</Link>
                </div>

            </Grid>
        </Container>
    )
};

export default AboutUs;