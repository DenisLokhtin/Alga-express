import React, {Fragment, useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteCarouselsRequest, fetchCarouselsRequest} from "../../store/actions/carouselActions";
import {apiURL} from "../../config";
import {Link} from "react-router-dom";
import {addCarousel, editingSingleCarousel} from "../../paths";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AppWindow from "../UI/AppWindow/AppWindow";

const useStyles = makeStyles(theme => ({
    carouselTitle: {
        textAlign: 'center',
    },

    carouselImage: {
        paddingBottom: '10px',
    },

    carouselContainer: {
        margin: '40px 0',
        textAlign: 'center',
    },

    gridCenter: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
        },
    },

    mediaQueriesDeleteBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            padding: '8px 16px',
            textAlign: 'center',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 37px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },

    mediaQueriesAddBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            padding: '8px 16px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 35px',
            display: 'flex',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },

    mediaQueriesEditBtn: {
        [theme.breakpoints.down('lg')]: {
            fontSize: '80px',
            padding: '8px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    }
}))

const Carousel = () => {
    const settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        arrows: false,
    };

    const classes = useStyles();
    const user = useSelector((state => state.users.user));
    const dispatch = useDispatch();
    const loading = useSelector(state => state.carousels.carouselsLoading);
    const carousels = useSelector(state => state.carousels.carousels);
    const [open, setOpen] = useState(false);
    const [deleteElement, setDeleteElement] = useState('');

    useEffect(() => {
        dispatch(fetchCarouselsRequest());
    }, [dispatch]);

    const deleteCarousel = (id) => {
        dispatch(deleteCarouselsRequest(id));
        setOpen(false);
        setDeleteElement(prevState => {prevState = ''; return prevState});
    };

    return (
        <div className={classes.carouselContainer}>
            <Slider {...settings}>
                {carousels && carousels.map(carousel => (
                    <Fragment key={carousel._id}>
                        <h3 className={classes.carouselTitle}>{carousel.info}</h3>
                        <img width="70%" style={{margin: '0 auto'}} src={apiURL + '/' + carousel.picture} alt={carousel.info}
                             className={classes.carouselImage}/>
                        {user && (user.role === 'superAdmin' || user.role === 'admin') && (
                            <Grid container justifyContent="space-between" spacing={2} className={classes.test}>
                                <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                    <ButtonWithProgress
                                        type="submit"
                                        startIcon={<AddBoxIcon/>}
                                        variant="contained"
                                        size={'medium'}
                                        loading={loading}
                                        disabled={loading}
                                        className={classes.mediaQueriesAddBtn}
                                        component={Link}
                                        to={addCarousel}
                                    >
                                        Добавить изображение
                                    </ButtonWithProgress>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                    <ButtonWithProgress
                                        type="submit"
                                        size={'medium'}
                                        startIcon={<ModeEditOutlinedIcon/>}
                                        className={classes.mediaQueriesEditBtn}
                                        fullWidth
                                        sx={{padding: '6px 10px'}}
                                        variant="contained"
                                        color="success"
                                        loading={loading}
                                        disabled={loading}
                                        component={Link}
                                        to={editingSingleCarousel + carousel._id}
                                    >
                                        Редактировать изображение
                                    </ButtonWithProgress>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={3} className={classes.gridCenter}>
                                    <ButtonWithProgress
                                        type="submit"
                                        startIcon={<DeleteOutlinedIcon/>}
                                        className={classes.mediaQueriesDeleteBtn}
                                        fullWidth
                                        size={'medium'}
                                        variant="contained"
                                        color="error"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={() => {
                                            setOpen(true);
                                            setDeleteElement(prevState => {prevState = carousel._id; return prevState});
                                        }}
                                    >
                                        Удалить изображение
                                    </ButtonWithProgress>
                                </Grid>
                            </Grid>
                        )}
                        <AppWindow open={open} onClose={() => {
                            setOpen(false);
                            setDeleteElement(prevState => {prevState = ''; return prevState});
                        }} confirm={() => deleteCarousel(deleteElement)}/>
                    </Fragment>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;