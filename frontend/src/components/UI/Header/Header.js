import React, {useState} from 'react';
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
    userLogin
} from "../../../paths";
import '../Header/Header.css';
import {Slide, useScrollTrigger} from "@mui/material";
import {useSelector} from "react-redux";
import UserMenu from "../Toolbar/Menu/UserMenu";

const Header = () => {
    const user = useSelector(state => state.users.user);
    const [addActiveClass, setAddActiveClass] = useState(false);
    const trigger = useScrollTrigger();

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
                <div className="container">
                    <div className="header__body">
                        <Link to="/" className="header__logo">
                            <img src={logo} alt="alga-express"/>
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
                                        <Link className="menu__link hover" to={contactsCompany}>
                                            Адреса складов
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Slide>
    );
};

export default Header;