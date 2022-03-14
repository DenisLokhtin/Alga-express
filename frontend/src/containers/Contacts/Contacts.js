import React, {useEffect, useRef} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import {fetchAllInformationRequest} from "../../store/actions/informationActions";
import {fetchWareHouseRequest} from "../../store/actions/wareHouseActions";

const useStyles = makeStyles(() => ({
    map: {
        border: 0,
        width: '700px',
        height: '500px',

        '@media (max-width:1200px)': {
            width: '600px',
            height: '400px',
        },
        '@media (max-width: 800px)': {
            width: '400px',
            height: '200px',
        },
        '@media (max-width: 600px)': {
            width: '300px',
            height: '150px',
        },
        '@media (max-width: 400px)': {
            width: '200px',
            height: '100px',
        },
        '@media (max-width: 300px)': {
            width: '150px',
            height: '70px',
        },
    },
}));

const Contacts = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const messagesEndRef = useRef(null);
    const information = useSelector(state => state.information.allInformation);
    const wareHouses = useSelector(state => state.wareHouses.wareHouse);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchAllInformationRequest());
        dispatch(fetchWareHouseRequest());
    }, [messagesEndRef, dispatch]);

    const print = (name) => {
        const days = ['Пн:', 'Вт:', 'Ср:', 'Чт:', 'Пт:', 'Сб:', 'Вс:'];

        if (information.length !== 0) {
            let someArr = information.filter(item => item.name === name);
            if (name === 'schedule') {
                return (
                    someArr[0].text.map((item, index) => {
                        return (
                            <span style={{display: 'block'}} key={index}><strong>{days[index]}</strong> {item}</span>
                        )
                    })
                )
            } else {
                return (
                    someArr[0].text.map((item, index) => {
                        return (
                            <span style={{display: 'block'}} key={index}>{item}</span>
                        )
                    })
                )
            }
        }
    };

    const printWarehouses = () => {
        if (wareHouses.length !== 0) {
            return (
                wareHouses.map((item, index) => (
                    <div key={index} style={{'marginBottom': '15px'}}>
                        <p><strong>{item.country}</strong></p>
                        <div dangerouslySetInnerHTML={{__html: item.info}}/>
                    </div>
                ))
            )
        }
    };

    return (
        <Container style={{'textAlign': 'center'}} component='div' ref={messagesEndRef}>
            <Container style={{
                'borderRadius': '3px',
                'margin': '10px 0 20px 0',
                'textAlign': 'left'
            }}
                       component='div'>

                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Контакты
                    </Typography>
                </div>
                <Grid style={{'marginBottom': '15px'}} component='div'>
                    <Typography component="div">
                        <div style={{'marginBottom': '15px'}}>
                            {print('officeAdress')}
                        </div>
                        <div style={{'marginBottom': '15px'}}>
                            {print('schedule')}
                        </div>
                        <div style={{'marginBottom': '15px'}}>
                            {print('contacts')}
                        </div>

                        <Typography>
                            <Link href="https://api.whatsapp.com/send?phone=996774769434" component="a">WhatsApp</Link>
                        </Typography>
                        <Typography>
                            <Link href="https://www.instagram.com/alga_express/" component="a">Instagram</Link>
                        </Typography>
                        <div>
                            {printWarehouses()}
                        </div>
                        <Typography style={{'fontWeight': 'Bold', 'marginTop': '10px'}}>
                            Информация
                        </Typography>
                        <Typography component="div">
                            <Typography style={{'margin': '5px 0 5px 0'}}>
                                От вас требуется фото вашего паспорта с обеих сторон для растаможки, email.
                                Прошу Вас обратить внимание на адрес 41 "B" не пропустите, при сохранении адреса на
                                сайтах
                                сохраняйте тот, который вы ввели вручную, а не тот который предлагает сайт). После
                                оформления заказа на наш склад, как только вам выдадут трек-код, отправьте мне в
                                обязательном порядке следующую информацию трек-код, вид посылки, цены, магазин.
                                <b> Это для регистрации, иначе ваша посылка не вылетит!</b>
                            </Typography>
                            <Typography style={{'margin': '5px 0 5px 0'}} component='div'>
                                <Typography>
                                    Сроки: 5-7 дней с момента вылета груза. Отправка каждые 10-12 дней.
                                </Typography>
                                Округление от 0,1 до 0,5 - как 0,5, выше всё по факту.
                            </Typography>
                        </Typography>

                    </Typography>
                </Grid>

                <iframe
                    className={classes.map}
                    title="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.4971004204913!2d74.62072151589662!3d42.841235779157536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb6697927eb87%3A0x4116c9c353dd9377!2zMTQyINC_0YDQvtGB0L8uINCu0L3Rg9GB0LDQu9C40LXQstCwLCDQkdC40YjQutC10Lo!5e0!3m2!1sru!2skg!4v1645193536509!5m2!1sru!2skg"
                    allowFullScreen=""
                    loading="lazy">
                    Адрес
                </iframe>
            </Container>
        </Container>
    )
};

export default Contacts;