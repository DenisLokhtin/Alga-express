import React, {useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteCarouselsRequest, fetchCarouselsRequest} from "../../store/actions/carouselActions";
import {apiURL} from "../../config";
import {Link} from "react-router-dom";
import {addCarousel} from "../../paths";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

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
                    color="success"
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
                            <button onClick={() => deleteCarousel(carousel._id)}>
                                Удалить изображение
                            </button>
                        )}
                        {user && user.role === 'superAdmin' && (
                            <button onClick={() => deleteCarousel(carousel._id)}>
                                Удалить изображение
                            </button>
                        )}


                    </div>

                ))}
            </Slider>

        </div>
    );
}

export default Carousel;