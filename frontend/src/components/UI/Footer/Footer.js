import React, {useEffect} from 'react';
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    rulesCompany,
    sitesCompany, wareHouseCompany
} from "../../../paths";
import {Link} from "react-router-dom";
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import {fetchAllInformationRequest} from "../../../store/actions/informationActions";
import {useDispatch, useSelector} from "react-redux";

const Footer = () => {
    const dispatch = useDispatch();
    const information = useSelector(state => state.information.allInformation);

    useEffect(() => {
        dispatch(fetchAllInformationRequest());
    }, [dispatch]);

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
                                <Link className="ft-main-list__link" to={wareHouseCompany}>Адреса складов</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ft-main-item">
                        <h4 className="ft-title">Наши контакты</h4>
                        <ul className="ft-main-list">
                            <li className="ft-main-list__item">
                                <PhoneIcon/>
                                <span style={{marginLeft: '10px'}}>{print('contacts')}</span>
                            </li>
                            <li className="ft-main-list__item">
                                <EmailIcon/>
                                <a className="ft-main-list__link ft-main-list-contacts"
                                   href="mailto:algaexpresskargo@gmail.com">
                                    algaexpresskargo@gmail.com
                                </a>
                            </li>
                            <li className="ft-main-list__item">
                                {print('officeAdress')}
                            </li>
                            <li>
                                {print('schedule')}
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
                            <a href="https://t.me/Vi10_kg">
                                <TelegramIcon sx={{color: "white"}}/>
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
            <section className="ft-legal">
                <ul className="ft-legal-list">
                    <li>
                        &copy; Copyright 2022 - All rights reserved
                    </li>
                </ul>
            </section>
        </footer>
    );
};

export default Footer;