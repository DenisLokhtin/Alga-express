import React from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

const useAdmin = () => {
    const user = useSelector(state => state.users.user);

    return user && user.role === 'admin';
};

const ProtectedRoutesForAdmin = () => {
    const isAdmin = useAdmin();

    return isAdmin ? <Outlet/> : <main style={{padding: "1rem"}}><h1>Page Not Found</h1></main>
};

export default ProtectedRoutesForAdmin;