import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import PackageRegister from "./containers/PackageRegister/PackageRegister";

const App = () => {
    return (
        <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/package-register' element={<PackageRegister/>}/>
        </Routes>
    );
};

export default App;