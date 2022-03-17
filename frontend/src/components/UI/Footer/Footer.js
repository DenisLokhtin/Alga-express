import React, {useEffect} from 'react';
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    rulesCompany,
    sitesCompany
} from "../../../paths";
import {Link} from "react-router-dom";
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllInformationRequest());
    }, [dispatch]);

    return (
        <footer className="footer">
            <div className="container">
                <section className="ft-main">
                    <div className="ft-main-item">
                        <h4 className="ft-title">Полезные ссылки</h4>
                        <ul className="ft-main-list">
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={howCompany}>Как это работает</Link>
                            </li>
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={sitesCompany}>Где покупать</Link>
                            </li>
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={aboutCompany}>О нас</Link>
                            </li>
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={newsCompany}>Новости</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ft-main-item">
                        <h4 className="ft-title">Полезные ссылки</h4>
                        <ul className="ft-main-list">
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={contactsCompany}>Контакты</Link>
                            </li>
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={rulesCompany}>Правила</Link>
                            </li>
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={faqCompany}>FAQ</Link>
                            </li>
                            <li className="ft-main-list__item">
                                <Link className="ft-main-list__link" to={contactsCompany}>Адреса складов</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ft-main-item">
                        <h4 className="ft-title">Наши контакты</h4>
                        <ul className="ft-main-list">
                            <li className="ft-main-list__item">
                                <PhoneIcon/>
                                <a className="ft-main-list__link ft-main-list-contacts" href="tel:+996774769434">
                                    0774769434
                                </a>
                            </li>
                            <li className="ft-main-list__item">
                                <EmailIcon/>
                                <a className="ft-main-list__link ft-main-list-contacts" href="mailto:algaexpresskargo@gmail.com">
                                    algaexpresskargo@gmail.com
                                </a>
                            </li>
                            <li className="ft-main-list__item">
                                Ждём ваших звонков
                            </li>
                            <li className="ft-main-list__item schedule">
                               c 09:00 до 18:00
                            </li>
                            <li className="ft-main-list__item schedule">
                               (вс, чт - выходной)
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="ft-social">
                    <ul className="ft-social-list">
                        <li className="ft-social-list__item">
                            <a href="https://www.instagram.com/alga_express/" target="_blank" rel="noreferrer">
                                <InstagramIcon sx={{color: "white"}}/>
                            </a>
                        </li>
                        <li className="ft-social-list__item">
                            <a href="https://api.whatsapp.com/send?phone=996774769434" target="_blank" rel="noreferrer">
                                <WhatsAppIcon sx={{color: "white"}}/>
                            </a>
                        </li>
                        <li className="ft-social-list__item">
                            <a href="https://api.whatsapp.com/send?phone=996774769434" target="_blank" rel="noreferrer">
                                <TelegramIcon sx={{color: "white"}}/>
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
            <section className="ft-legal">
                <ul className="ft-legal-list">
                    <li>
                        <Link to="/" className="ft-legal__terms" href="#">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                        <Link to="/" className="ft-legal__terms" href="#">Privacy Policy</Link>
                    </li>
                    <li>
                        &copy; Copyright 2022 - All rights reserved
                    </li>
                </ul>
            </section>
        </footer>
    );
};

export default Footer;