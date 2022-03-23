import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    newUserRegister,
    rulesCompany,
    sitesCompany,
    userLogin, wareHouseCompany
} from "../../../paths";
import '../Header/Header.css';
import {LinearProgress, Slide, useScrollTrigger} from "@mui/material";
import {useSelector} from "react-redux";
import UserMenu from "../Toolbar/Menu/UserMenu";
import theme from "../../../theme";

const Header = () => {
    const user = useSelector(state => state.users.user);
    const loadUserData = useSelector(state => state.users.loadUserDate);
    const loadDeliveryData = useSelector(state => state.delivery.loading);
    const loadCarouselData = useSelector(state => state.carousels.carouselsLoading);
    const loadFlightData = useSelector(state => state.flights.loading);
    const loadInformationData = useSelector(state => state.information.loading);
    const loadMarketData = useSelector(state => state.market.fetchLoading);
    const loadNewsData = useSelector(state => state.news.fetchLoading);
    const loadSingleNewsData = useSelector(state => state.news.singleLoading);
    const loadPageData = useSelector(state => state.pages.loading);
    const loadPlayerData = useSelector(state => state.players.fetchLoading);
    const loadRequisiteData = useSelector(state => state.requisites.loading);
    const loadTariffData = useSelector(state => state.tariffs.fetchLoading);
    const loadWareHouseData = useSelector(state => state.wareHouses.fetchLoading);
    const loadWareHouseSingleData = useSelector(state => state.wareHouses.singleLoading);

    const [addActiveClass, setAddActiveClass] = useState(false);
    const trigger = useScrollTrigger();
    const [loading, setLoading] = useState({status: false});

    useEffect(() => {
            setLoading(prevState => ({
                ...prevState,
                status: loadUserData ||
                    loadDeliveryData ||
                    loadCarouselData ||
                    loadFlightData ||
                    loadInformationData ||
                    loadMarketData ||
                    loadNewsData ||
                    loadSingleNewsData ||
                    loadPageData ||
                    loadPlayerData ||
                    loadRequisiteData ||
                    loadTariffData ||
                    loadWareHouseData ||
                    loadWareHouseSingleData
            }));
    }, [
        loadUserData,
        loadDeliveryData,
        loadCarouselData,
        loadFlightData,
        loadInformationData,
        loadMarketData,
        loadNewsData,
        loadSingleNewsData,
        loadPageData,
        loadPlayerData,
        loadRequisiteData,
        loadTariffData,
        loadWareHouseData,
        loadWareHouseSingleData,
    ]);

    const addClass = () => {
        setAddActiveClass(!addActiveClass);

        if (!addActiveClass) {
            document.body.classList.add('lock');
        } else {
            document.body.classList.remove('lock');
        }
    };

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <header className="header">
                <div className="container" style={theme.relative}>
                    <div className="header__body">
                        <Link to="/" className={`header__logo`}>
                            <img src={logo} alt="alga-express"/>
                            <span className="header__logo-title">Alga-Express</span>
                        </Link>
                        {user && user.role ? (
                            <UserMenu user={user}/>
                        ) : (
                            <div className="header__btns">
                                <div className="btn-cont">
                                    <Link className="btn" to={newUserRegister}>
                                        Зарегистрироваться
                                    </Link>
                                </div>
                                <div className="btn-cont">
                                    <Link className="btn" to={userLogin}>
                                        Войти
                                    </Link>
                                </div>
                            </div>
                        )}
                        <div className="header__bottom">
                            <div className={`header__burger ${addActiveClass ? 'active' : ''}`} onClick={addClass}>
                                <span/>
                            </div>
                            <nav className={`header__menu ${addActiveClass ? 'active' : ''}`}>
                                <ul className="header__list">
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={howCompany}>
                                            Как это работает
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={sitesCompany}>
                                            Где покупать
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={contactsCompany}>
                                            Контакты
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={aboutCompany}>
                                            О нас
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={rulesCompany}>
                                            Правила
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={newsCompany}>
                                            Новости
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover " to={faqCompany}>
                                            FAQ
                                        </Link>
                                    </li>
                                    <li className="header__list-item" onClick={addClass}>
                                        <Link className="menu__link hover" to={wareHouseCompany}>
                                            Адреса складов
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div style={theme.progress}>
                    {loading.status && <LinearProgress color="error"/>}
                </div>
            </header>
        </Slide>
    );
};

export default Header;