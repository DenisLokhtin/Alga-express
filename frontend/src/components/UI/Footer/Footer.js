import React, {useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    rulesCompany,
    sitesCompany
} from "../../../paths";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import theme from "../../../theme";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllInformationRequest} from "../../../store/actions/informationActions";

const pages = [
    {title: "Новости", url: newsCompany},
    {title: "Правила", url: rulesCompany},
    {title: "Контакты", url: contactsCompany},
    {title: "Как это работает?", url: howCompany},
    {title: "О нас", url: aboutCompany},
    {title: "Где покупать?", url: sitesCompany},
    {title: "FAQ", url: faqCompany},
];

const useStyles = makeStyles({
    link: {
        color: "white",
        textDecoration: "none"
    },
    netLinks: {
        display: "flex",
        alignItems: "center",
        "& > a" : {
              margin: '10px 0 0 15px',
        },
    }
});

const Footer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const information = useSelector(state => state.information.allInformation);

    useEffect(() => {
        dispatch(fetchAllInformationRequest());
    },[dispatch]);

    const print = () => {
      if (information[0]) {
        return  (
            <div>
                <div className="post__content" dangerouslySetInnerHTML={{__html: information[1].text}}/>
                <div className="post__content" dangerouslySetInnerHTML={{__html: information[3].text}}/>
            </div>
        )
      }
    };

    return (
        <footer style={theme.footer}>
            <Grid container sx={{flexWrap: "wrap"}}>
                <Grid item xs={12} md={6} lg={4}>
                    <Box style={theme.pages}>
                        {pages.map(item => (
                            <Link key={item.url} to={item.url} className={classes.link} style={{display: "block"}}>
                                {item.title}
                            </Link>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Box style={theme.address}>

                        {print()}

                        <Box className={classes.netLinks}>
                            <a href="https://www.instagram.com/alga_express/" target="_blank" rel="noreferrer">
                                <InstagramIcon sx={{color: "white"}}/>
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=996774769434" target="_blank" rel="noreferrer">
                                <WhatsAppIcon sx={{color: "white"}}/>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;