import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Contacts from "./containers/Contacts/Contacts";
import Rules from "./containers/Rules/Rules";
import AboutUs from "./containers/AboutUs/AboutUs";
import HowItWorks from "./containers/HowItWorks/HowItWorks";
import ProhibitedGoods from "./containers/ProhibitedGoods/ProhibitedGoods";

const App = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/rules' exact element={<Rules/>}/>
            <Route path='/about_us' exact element={<AboutUs/>}/>
            <Route path='/contacts' exact element={<Contacts/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/how_it_works' exact element={<HowItWorks/>}/>
            <Route path='/prohibited_goods' exact element={<ProhibitedGoods/>}/>
        </Routes>
    );
};

export default App;