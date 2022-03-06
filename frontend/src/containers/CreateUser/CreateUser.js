import React, {useEffect, useRef} from 'react';
import Register from "../Register/Register";
import {useSelector} from "react-redux";

const CreateUser = () => {
    const userData = useSelector(state => state.users.user);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
    }, [messagesEndRef]);


    return (
        <Register userData={userData} ref={messagesEndRef}/>
    );
};

export default CreateUser;