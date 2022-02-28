import React from 'react';
import Register from "../Register/Register";
import {useSelector} from "react-redux";

const CreateUser = () => {
    const userData = useSelector(state => state.users.user);

    return (
        <Register userData={userData}/>
    );
};

export default CreateUser;