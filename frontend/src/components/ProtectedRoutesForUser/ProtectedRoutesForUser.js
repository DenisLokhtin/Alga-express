import React from 'react';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const useAuth = () => {
    const user = useSelector(state => state.users.user);

    return user?.role === 'user' || user?.role === 'admin';
};

const ProtectedRoutesForUser = () => {
    const isAuth = useAuth();

    return (
        isAuth ? <Outlet/> : <main style={{padding: "1rem"}}> <h1>Page Not Found</h1> </main>
    );
};

//могу сделать еще один такой файл, и в этом файле будет только user.role === 'admin??'

export default ProtectedRoutesForUser;