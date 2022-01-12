import React from 'react';
import GoogleLoginButton from 'react-google-login';
import {googleClientId} from "../../../config";
import {Button} from "@material-ui/core";
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {googleLogin} from "../../../store/actions/usersActions";

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = response => {
    dispatch(googleLogin(response));
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