import React, {Fragment, useEffect} from "react";
import {Link} from "react-router-dom";
import {newsCompany} from "../../paths";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsRequest} from "../../store/actions/newsActions";

const NewsPanel = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);

    useEffect(() => {
        dispatch(fetchNewsRequest('?latestNews=4'));
    }, [dispatch]);

    return (
        <ul className="news-list">
            {news.length > 0 ? news.map(news => (
                <Fragment key={news._id}>
                    <li style={{color: 'rgba(255,255,255, 0.3)', fontSize: '13px'}}>
                        {news.datetime}
                    </li>
                    <li className="news-list__item" style={{fontSize: '20px'}}>
                        {news.title}
                    </li>
                    <li className="news-list__item">
                        <Link to={`${newsCompany}/${news._id}`} className="read-more">
                            <span style={{fontSize: '18px'}}>Подробнее {news.description ? '...' : ''}</span>
                        </Link>
                    </li>
                </Fragment>
            )) : null}
        </ul>
    )
};

export default NewsPanel;