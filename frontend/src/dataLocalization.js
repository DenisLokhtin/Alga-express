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
    PROCESSED: 'В процессе',
    DONE: 'Выдан',
    ERASED: 'Удалён',
};

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
}

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