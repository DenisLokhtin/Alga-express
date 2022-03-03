import React from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

const HasAccess = () => {
    const user = useSelector(state => state.users.user);

    return user?.role === 'superAdmin';
};

const ProtectedRoutesForSuperAdmin = () => {
    const isSuperAdmin = HasAccess();

    return isSuperAdmin ? <Outlet/> : <main style={{padding: "1rem"}}> <h1>Page Not Found</h1> </main>
};

export default ProtectedRoutesForSuperAdmin;