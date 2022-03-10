import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch} from "react-redux";
import {postDeliveryRequest} from "../../store/actions/deliveryAction";
import {changeDeliveryStatusRequest, getOrdersHistoryRequest} from "../../store/actions/packageRegisterActions";
import {useEffect} from "react";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeliveryModal = (props) => {
    const [address, setAddress] = useState({
        address: '',
        trackNumber: props.track,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setAddress({
            address: '',
            trackNumber: props.track,
        });
    }, [props.track]);

    const submitFormHandler = e => {
        e.preventDefault();
        props.close();
        const page = props.page;
        const pageLimit = props.pageLimit;
        dispatch(changeDeliveryStatusRequest(address));
        dispatch(postDeliveryRequest(address));
        dispatch(getOrdersHistoryRequest({page, limit: pageLimit}));
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setAddress(prevState => ({...prevState, [name]: value}));
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Grid style={{textAlign: "left"}} component="form" flexDirection="column"
                          onSubmit={submitFormHandler}
                    >
                        <h2>Заказать доставку</h2>
                        <Typography><b>Информация о посылке:</b></Typography>
                        <Typography>Заголовок: {props.title}</Typography>
                        <Typography>Трек номер: {props.track}</Typography>
                        <Typography>Статус: {props.status}</Typography>
                        <Typography>Страна: {props.country}</Typography>
                        <Typography><b>Укажите адрес:</b></Typography>
                        <textarea name="address" id="address" cols="80" rows="7" placeholder="Введите ваш адрес"
                                  onChange={inputChangeHandler}/>
                        <Grid item xs={12} sm={8} md={7} lg={7}>
                            <ButtonWithProgress
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginTop: 10, width: '172%'}}
                                disabled={address.address === ''}
                            >
                                Подтвердить
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
};

export default DeliveryModal;