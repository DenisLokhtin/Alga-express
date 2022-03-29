import Button from "@mui/material/Button";
import LinkIcon from '@mui/icons-material/Link';
import {Link} from "react-router-dom";
import React from "react";

export const packagesColumns = [
    {
        field: 'cargoNumber',
        headerName: 'Карго-номер',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'trackNumber',
        headerName: 'Трек-номер',
        flex: 1,
        minWidth: 195,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'country',
        headerName: 'Страна',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'title',
        headerName: 'Название',
        flex: 1,
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'name',
        headerName: 'Пользователь',
        flex: 1,
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "status",
        headerName: 'Статус',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "amount",
        headerName: 'Кол-во',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "arrived_date",
        headerName: 'Дата прилёта',
        flex: 1,
        minWidth: 120,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "actions",
        type: "actions",
        width: 150,
        getActions: (params) => [
            <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={params.row.status !== 'Оформлен'}
            >
                <Link to={`/user/package/edit/${params.id}`}
                      style={{textDecoration: 'none', color: 'inherit'}}>Редактировать</Link>
            </Button>
        ]
    },
    {
        field: "price",
        headerName: 'Цена доставки',
        flex: 1,
        minWidth: 120,
        headerAlign: 'center',
        align: 'center',
    },

];

export const buyoutsColumns = [
    {
        field: 'url',
        headerName: 'Сайт товара',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            <Button
                startIcon={<LinkIcon/>}
                component={"a"}
                href={params.row.url}
                target="_blank"
            >
                Перейти
            </Button>
        )
    },
    {
        field: 'country',
        headerName: 'Страна',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'datetime',
        headerName: 'Дата',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'user',
        headerName: 'Пользователь',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'status',
        headerName: 'Статус',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'price',
        headerName: 'Цена',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => {
            return <p style={{display: 'flex', alignItems: 'center'}}
            >{params.value.price} {params.value.icon}
            </p>
        },

    },
    {
        field: 'commission',
        headerName: 'Комиссия',
        flex: 1,
        minWidth: 90,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'totalPrice',
        headerName: 'Цена с учетом комиссии',
        flex: 1,
        minWidth: 120,
        headerAlign: 'center',
        align: 'center',
    },
];

export const paymentsColumns = [
    {
        field: 'description',
        headerName: 'Описание',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'user',
        headerName: 'Пользователь',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'date',
        headerName: 'Дата',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    }
]