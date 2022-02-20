import React from 'react';
import {Backdrop, Button, Card, CardContent, Fade, Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
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

const AppWindow = ({open, onClose, confirm}) => {
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
                    <CardContent>
                        <Typography variant="h6" textAlign="center" color="text.secondary">
                            Вы действительно хотите продолжить ?
                        </Typography>
                    </CardContent>
                    <Grid container justifyContent="space-evenly" alignItems="center">
                        <Grid item>
                            <Button
                                color="primary"
                                onClick={confirm}
                                variant="outlined"
                            >
                                Да
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                onClick={onClose}
                                variant="outlined"
                            >
                                Нет
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Fade>
        </Modal>
    );
};

export default AppWindow;