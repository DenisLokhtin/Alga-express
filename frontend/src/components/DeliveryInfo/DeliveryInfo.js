import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import {Backdrop, Card, CardContent, CardHeader, Fade, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from "react-redux";
import {putDeliveryRequest} from "../../store/actions/deliveryAction";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    p: 2,
}

const DeliveryInfo = ({packageData, open, onClose, update}) => {
    const dispatch = useDispatch();
    const [editStatus, setEditStatus] = useState(false);
    const [address, setAddress] = useState({
        address: packageData.delivery.address
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const saveHandleClick = (e) => {
        e.preventDefault();
        dispatch(putDeliveryRequest({id: packageData.delivery._id, address}));
        onClose();
        update();
    };

    return (
        packageData && <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Card sx={style} variant="outlined">
                    <CardHeader title={packageData.title}/>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="body1">
                                    <strong>Пользователь:</strong> {packageData.name}
                                </Typography>
                            </Grid>


                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="body1">
                                    <strong>Трек-номер:</strong> {packageData.trackNumber}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="body1">
                                    <strong>Карго-номер:</strong> {packageData.cargoNumber}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    label="Адрес"
                                    multiline
                                    rows={4}
                                    name="address"
                                    value={address.address}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={!editStatus}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    startIcon={<EditIcon/>}
                                    onClick={() => setEditStatus(!editStatus)}
                                    fullWidth
                                >
                                    Редактировать
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    disabled={!editStatus}
                                    onClick={saveHandleClick}
                                    fullWidth
                                >
                                    Сохранить
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    );
};

export default DeliveryInfo;