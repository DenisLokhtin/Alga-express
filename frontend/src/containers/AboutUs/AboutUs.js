import React from 'react';
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const AboutUs = () => {
    const classes = useStyles();

    return (
        <Container style={{'textAlign': 'center'}} component='div'>
            <Container style={{
                'border': '2px solid #2E2E2E',
                'borderRadius': '3px',
                'margin': '10px 0 20px 0',
                'textAlign': 'left'
            }}
                       component='div'>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        О нас
                    </Typography>
                </div>
                <Grid style={{'marginBottom': '15px'}} component='div'>
                    <Typography style={{'fontWeight': 'Bold', 'marginTop': '10px'}} component="p">
                        Мы ценим своих клиентов
                    </Typography>
                    В Alga Express мы понимаем, что наши клиенты ценят свое время, деньги и хотят получать только лучшие
                    товары
                    для себя и своих близких. Поэтому мы предлагаем качественные и быстрые услуги по покупке и доставке
                    товаров из интернет-магазинов США, Китая и Турции в Бишкек. У нас действуют наиболее низкие тарифы
                    на
                    рынке Бишкека.
                    Цель нашей компании - сделать интернет-шоппинг доступным для большинства кыргызстанцев.
                    <Typography style={{'fontWeight': 'Bold', 'marginTop': '10px'}} component="p">
                        Почему именно мы?
                    </Typography>
                    Количество людей, которые заказывают товары в интернет-магазинах, постоянно растет. Доставка из
                    интернет-магазинов
                    уже хорошо распространена в России и Украине, на их рынках работают десятки компаний, подобных
                    Alga Express. Мы используем опыт самых успешных компаний в этой сфере, чтобы подарить своим клиентам
                    наиболее качественные, доступные и быстрые услуги по доставке товаров из интернет-магазинов.

                    <Typography style={{'fontWeight': 'Bold', 'marginTop': '10px'}} component="p">
                        Как это работает?
                    </Typography>
                    После оформления покупок в интернет-магазинах все заказы поступают на наш основной склад. Далее
                    посылки
                    консолидируются и еженедельно доставляются самолетом в Бишкек. Сроки доставки -
                    10-12 рабочих дней со дня отправки. В результате Вы экономите на покупке и доставке и получаете
                    товары отличного качества в короткие сроки.
                </Grid>
            </Container>
        </Container>
    )
};

export default AboutUs;