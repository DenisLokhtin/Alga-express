import React, {useEffect} from "react";
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

const Carousel = () => {
    const settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
    };

    const user = useSelector((state => state.users.user));
    const dispatch = useDispatch();
    const loading = useSelector(state => state.carousels.carouselsLoading);
    const carousels = useSelector(state => state.carousels.carousels);

    useEffect(() => {
        dispatch(fetchCarouselsRequest());
    }, [dispatch]);

    const deleteCarousel = (id) => {
        dispatch(deleteCarouselsRequest(id));
    };

    return (
        <div>
            {user && (user.role === 'superAdmin' || user.role === 'admin') && (
                <ButtonWithProgress
                    type="submit"
                    variant="contained"
                    color="error"
                    loading={loading}
                    disabled={loading}
                    component={Link}
                    to={addCarousel}
                >
                    <AddBoxIcon/> Добавить изображение
                </ButtonWithProgress>
            )}
            <Slider {...settings}>
                {carousels && carousels.map(carousel => (
                    <div key={carousel._id}>
                        <h3>{carousel.info}</h3>
                        <img width="100%" src={apiURL + '/' + carousel.picture} alt={carousel.info}/>
                        {user && user.role === 'admin' && (
                            <ButtonWithProgress
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="error"
                                loading={loading}
                                disabled={loading}
                                onClick={() => deleteCarousel(carousel._id)}
                            >
                                Удалить изображение
                            </ButtonWithProgress>
                        )}
                        {user && user.role === 'superAdmin' && (
                            <ButtonWithProgress
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="error"
                                loading={loading}
                                disabled={loading}
                                onClick={() => deleteCarousel(carousel._id)}
                            >
                                Удалить изображение
                            </ButtonWithProgress>
                        )}

                        {user && (user.role === 'superAdmin' || user.role === 'admin') && (
                            <Grid item xs={3}>
                                <ButtonWithProgress
                                    type="submit"
                                    fullWidth
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
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;