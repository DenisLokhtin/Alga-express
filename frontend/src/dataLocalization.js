import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import React from "react";

export const statuses = {
    NEW: 'Новый',
    REGISTERED: 'Оформлен',
    DELIVERED: 'Прибыл',
    ON_WAREHOUSE: 'На складе',
    ON_WAY: 'В пути',
    DONE: 'Выдан',
    ERASED: 'Удалён',
};

export const flightStatuses ={
    ACTIVE: 'Активный',
    DONE: 'Прибыл',
}

export const countries = {
    usa: 'Америка - Авиа',
    turkey: 'Турция - Авиа',
    turkeyGround: 'Турция',
    china: 'Китай - Авиа',
    chinaGround: 'Китай',
};

export const saleCountry = {
    USA: 'Америка',
    Turkey: 'Турция',
    China: 'Китай',
};

export const groups = {
    NEW: 'Новый',
    ADVANCED: 'Продвинутый',
    BUYER: 'Байер',
    VIP: 'VIP'
};

export const valueIcon = (value) => {
    switch (value) {
        case 'USD':
            return <AttachMoneyIcon/>;
        case 'CNY':
            return <CurrencyYenIcon/>;
        case 'TRY':
            return <CurrencyLiraIcon/>;
        default:
            return;
    }
};