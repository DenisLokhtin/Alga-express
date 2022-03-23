import React, {Fragment, useEffect, useRef, useState} from 'react';
import {makeStyles} from "@mui/styles";
import NewsPanel from "../../components/NewsPanel/NewsPanel";
import Carousel from "../../components/Carousel/Carousel";
import {fetchAllInformationRequest} from "../../store/actions/informationActions";
import {useDispatch, useSelector} from "react-redux";
import '../HomePage/HomePage.css';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import mainPicture from '../../assets/images/mainPic.jpg';
import {Grid, IconButton, Link} from "@mui/material";
import {apiURL} from "../../config";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AppWindow from "../../components/UI/AppWindow/AppWindow";
import {deleteMarketRequest, fetchMarketRequest} from "../../store/actions/marketActions";

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 768,
        },
    },

    content: {
        background: `url(${mainPicture})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
    },
}));

const HomePage = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);
    const messagesEndRef = useRef(null);
    const market = useSelector(state => state.market.sites);

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllInformationRequest());
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchMarketRequest());
    }, [messagesEndRef, dispatch]);

    return (
        <>
            <div className={classes.content}>
                <div className="container">
                    <div className="content__text">
                        <div className="delivery">
                            <h1 className="delivery__title">
                                Доставим ваш груз в любую точку страны
                            </h1>
                            <div>
                                <ul className="delivery__list">
                                    <li className="delivery__list-item">
                                        <span className="delivery__list-icon"><LocalShippingOutlinedIcon
                                            style={{fontSize: '35px'}}/></span>
                                        <span>Перевозки грузов по земле и воздуху</span>
                                    </li>
                                    <li className="delivery__list-item">
                                        <span className="delivery__list-icon"><InventoryOutlinedIcon
                                            style={{fontSize: '35px'}}/></span>
                                        <span>Выкупаем, доставляем с любого сайта 7-10 дней</span>
                                    </li>
                                    <li className="delivery__list-item">
                                        <span className="delivery__list-icon"><PeopleOutlinedIcon
                                            style={{fontSize: '35px'}}/></span>
                                        <span>Более 3000 довольных клиентов</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="news">
                            <NewsPanel/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="benefits">
                <div className="container">
                    <h3 className="benefits__title">Почему именно мы ?</h3>
                    <div className="benefits__blocks">
                        <div className="benefits__blocks-block">
                            <h5 className="benefits__blocks-title sending-cargo">
                                Отправка груза два раза в неделю
                            </h5>
                        </div>
                        <div className="benefits__blocks-block">
                            <h5 className="benefits__blocks-title fast-delivery">
                                Быстрая доставка
                            </h5>
                        </div>
                        <div className="benefits__blocks-block">
                            <h5 className="benefits__blocks-title quality-service">
                                Качественная услуга
                            </h5>
                        </div>
                        <div className="benefits__blocks-block">
                            <h5 className="benefits__blocks-title payment-dollar">
                                Лучшие цены
                            </h5>
                        </div>
                        <div className="benefits__blocks-block">
                            <h5 className="benefits__blocks-title delivery-country">
                                Доставим в любую точку города и области
                            </h5>
                        </div>
                        <div className="benefits__blocks-block">
                            <h5 className="benefits__blocks-title hand-over">
                                Передаём адресату «из рук в руки»
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 className="websites-logo-title">Где покупать ? </h3>
                <Grid container className="website-block-container">
                    {market && market.map(m => (
                        <Fragment key={m._id}>
                            <div className="website-block-container__item" style={{position: "relative",}}>
                                <Link href={m.url} target={'_blank'} rel={'noopener'}>
                                    <img className="website-block-container__img" src={`${apiURL}/${m.image}`} alt="website"/>
                                </Link>
                                {user && (user.role === 'admin' || user.role === 'superAdmin') && (
                                    <>
                                        <IconButton style={{position: "absolute", top: '0', right: '-20px'}}
                                                    onClick={() => setOpen(true)}>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                        <AppWindow open={open} onClose={() => setOpen(false)}
                                                   confirm={() => dispatch(deleteMarketRequest(m._id))}/>
                                    </>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </Grid>
            </div>
            <div className="carousel">
                <div className="container">
                    <Carousel/>
                </div>
            </div>
        </>
    );
};

export default HomePage;