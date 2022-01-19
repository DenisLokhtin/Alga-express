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
import News from "./containers/News/News";
import MarketSites from "./containers/MarketSites/MarketSites";
import SingleNews from "./containers/SingleNews/SingleNews";
import HomePage from "./containers/HomePage/HomePage";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/package-register' element={<PackageRegister/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/rules' element={<Rules/>}/>
                <Route path='/about_us' element={<AboutUs/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/how_it_works' element={<HowItWorks/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/news/:id' element={<SingleNews/>}/>
                <Route path='/sites' element={<MarketSites/>}/>
            </Routes>
        </Layout>
    );
};

export default App;