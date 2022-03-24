import React from 'react';
import Modal from "@mui/material/Modal";
import {Backdrop, Card, CardContent, CardHeader, Fade, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    p: 2,
}

const DeliveryInfo = ({packageData, open, onClose}) => {

    return (
        <Modal
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
                        <Grid container>
                            <Grid item>
                                <Typography variant="body1">
                                    Пользователь: {packageData.user}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">
                                    Адрес: {packageData.address}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">
                                    Трек-номер: {packageData.trackNumber}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">
                                    Карго-номер: {packageData.cargoNumber}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">
                                    Страна: {packageData.country}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">
                                    Статус: {packageData.status}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    );
};

export default DeliveryInfo;