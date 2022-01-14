import React from 'react';
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const HowItWorks = () => {
    const classes = useStyles();

    return (
        <Container style={{'border': '2px solid #2E2E2E', 'borderRadius': '3px', 'margin': '10px 0 20px 0'}}
                   component='div'>
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Как это работает
                </Typography>
            </div>
            <Grid style={{'marginBottom': '15px'}} component='div'>
                <div>
                    <h4><strong>Alga Express</strong> –простой и проверенный сервис по пересылке заказов из
                        интернет-магазинов США и Турции в Кыргызстан.</h4>
                    <p>&nbsp;</p>
                    <p>Мы предоставляем почтовый адрес в <strong>США и Турции</strong>, благодаря чему наши клиенты
                        получают возможность самостоятельно делать покупки в интернет-магазинах и отслеживать их
                        перемещение&nbsp; на сайте AlgaExpress.kg до прибытия посылки на склад в Бишкек, Кыргызстан.</p>
                    <p>&nbsp;</p>
                    <h3><strong>1. Выкуп с интернет-магазинов</strong></h3>
                    <p>Наши клиенты сами или с помощью сотрудников Alga Express оформляют покупку в любых
                        интернет-магазинах США и/или Турции, указывая соответствующий адрес доставки:</p>
                    <p>&nbsp;</p>
                    <h3><strong>2. Прием, упаковка, проверка и пересылка посылок</strong></h3>
                    <p>Мы принимаем посылки наших клиентов на соответствующих складах и осуществляем подготовку к
                        отправке в Кыргызстан, Бишкек.</p>
                    <p>&nbsp;</p>
                    <h3><strong>3. Выдача посылок</strong></h3>
                    <p>Посылки прибывают в течение 5-7 дней с момента отправки со складов США и Турции. Наши клиенты
                        получат соответствующие уведомления о прибытии посылок на сайте AlgaExpress.kg, а также письменную
                        рассылку на почту, указанную при регистрации на сайте.</p>
                </div>
            </Grid>
        </Container>
    )
};

export default HowItWorks;