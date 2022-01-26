import React, {useEffect} from 'react';
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./BurgerMenu.css";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

const BurgerMenu = ({open, setOpen, children}) => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate('/');
        setOpen(false);
    }

    useEffect(() => {
        return () => {
            setOpen(false);
        }
    }, []);

    return (
        <div className={open ? 'menu active' : 'menu'} onClick={() => setOpen(false)}>
            <div className="menu__content" onClick={e => e.stopPropagation()}>
                <div className="menu-header">
                    <IconButton type="button" onClick={() => setOpen(false)}>
                        <CloseIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>
                    </IconButton>
                    <IconButton type="button" onClick={toHome}>
                        <HomeIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>
                    </IconButton>
                </div>
                {children}
            </div>
        </div>
    );
};

export default BurgerMenu;