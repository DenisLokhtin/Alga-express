import Button from "@mui/material/Button";
import LinkIcon from '@mui/icons-material/Link';

export const packagesColumns = [
    {
        field: 'cargoNumber',
        headerName: 'Карго-номер',
        flex: 1,
        minWidth: 150,
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
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'title',
        headerName: 'Заголовок',
        flex: 1,
        minWidth: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'status',
        headerName: 'Статус',
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
    },
];

export const buyoutsColumns = [
    {
        field: 'description',
        headerName: 'Описание',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
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
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'datetime',
        headerName: 'Дата',
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
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'commission',
        headerName: 'Комиссия',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'value',
        headerName: 'Валюта',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'totalPrice',
        headerName: 'Цена с учетом комиссии',
        flex: 1,
        minWidth: 150,
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
    },
    {
        field: 'amount',
        headerName: 'Сумма',
        flex: 1,
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
    }
]