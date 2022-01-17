import React from 'react';
import GoogleLoginButton from 'react-google-login';
import {googleClientId} from "../../../config";
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {googleLoginRequest} from "../../../store/actions/usersActions";
import Button from "@mui/material/Button";

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = response => {
    dispatch(googleLoginRequest(response));
  };

  return (
    <GoogleLoginButton
      clientId={googleClientId}
      render={props => (
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<FcGoogle/>}
          onClick={props.onClick}
        >
          Войти при помощи Google
        </Button>
      )}
      onSuccess={handleLogin}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLogin;