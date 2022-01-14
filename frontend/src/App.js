import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const App = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
        </Routes>
    );
};

export default App;