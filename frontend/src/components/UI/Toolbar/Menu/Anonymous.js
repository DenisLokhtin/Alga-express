import React from 'react';
import LoginIcon from "@mui/icons-material/Login";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {userLogin} from "../../../../paths";

const Anonymous = () => {
    return (
        <Button
            sx={{borderColor: "#F5F5F7", color: "#F5F5F7",
                '&:hover': {borderColor: "#F5F5F7"}}}
            startIcon={<LoginIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>}
            variant="outlined"
            component={Link}
            to={userLogin}
        >
            Войти
        </Button>
    );
};

export default Anonymous;