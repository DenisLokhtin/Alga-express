import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import PackageRegister from "./containers/PackageRegister/PackageRegister";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import AboutUs from "./containers/AboutUs/AboutUs";
import Contacts from "./containers/Contacts/Contacts";
import Rules from "./containers/Rules/Rules";
import HowItWorks from "./containers/HowItWorks/HowItWorks";

const App = () => {
    return (
        <Layout>
        <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/package-register' element={<PackageRegister/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/rules' exact element={<Rules/>}/>
                <Route path='/about_us' exact element={<AboutUs/>}/>
                <Route path='/contacts' exact element={<Contacts/>}/>
                <Route path='/register' exact element={<Register/>}/>
                <Route path='/how_it_works' exact element={<HowItWorks/>}/>
            </Routes>
        </Layout>
    );
};

export default App;