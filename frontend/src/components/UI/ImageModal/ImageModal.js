import React from 'react';
import {Backdrop, Card, Fade, IconButton, Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
    card: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'background.paper',
        p: 1,
    },
    img: {
        width: "100%",
    }
}

const ImageModal = ({open, onClose, data}) => {
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
                <Card sx={styles.card} variant="outlined">
                    <Grid container justifyContent="space-evenly"  flexDirection="column">
                        <Grid item xs={12} md={12} lg={12} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">
                                {data.user} {data.date}
                            </Typography>

                            <IconButton onClick={onClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Box sx={{width: {xs: 300, md: 400, lg: 600}}}>
                                <img style={styles.img} src={data.image} alt=""/>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Fade>
        </Modal>
    );
};

export default ImageModal;