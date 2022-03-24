import * as React from 'react';
import {useState} from 'react';
import Modal from '@mui/material/Modal';
import {useDispatch} from "react-redux";
import {Backdrop, Card, CardContent, CardHeader, Fade, Grid, TextField} from "@mui/material";
import {postDeliveryRequest} from "../../store/actions/deliveryAction";
import Typography from "@mui/material/Typography";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Button from "@mui/material/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: 300, sm: 400},
    backgroundColor: 'background.paper',
    p: 2,
}

const DeliveryModal = ({packageData, open, onClose}) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        address: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(postDeliveryRequest({package: packageData.id, address, onClose}));
    }

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
                <Card sx={style}>
                    <CardHeader subheader={`Оформить доставку на посылку`}/>
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
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    disabled={packageData.delivery !== undefined}
                                    startIcon={<DeliveryDiningIcon/>}
                                    onClick={handleClick}
                                    fullWidth
                                >
                                    Оформить
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    )
};

export default DeliveryModal;