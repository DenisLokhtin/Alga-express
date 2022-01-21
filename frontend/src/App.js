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
import EditPackage from "./containers/EditPackage/EditPackage";
import FAQ from "./containers/FAQ/FAQ";
import EditNews from "./containers/EditNews/EditNews";
import AdminEditPackage from "./containers/AdminEditPackage/AdminEditPackage";
import OrderHistory from "./containers/OrderHistory/OrderHistory";
import SpecificPackage from "./containers/SpecificPackage/SpecificPackage";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path="order_history" element={<OrderHistory/>}/>
                <Route path='/specific_package/:id' element={<SpecificPackage/>}/>
                <Route path='/package-register' element={<PackageRegister/>}/>
                <Route path='/package-edit/:id' element={<EditPackage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/rules' element={<Rules/>}/>
                <Route path='/about_us' element={<AboutUs/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/how_it_works' element={<HowItWorks/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/news/:id' element={<SingleNews/>}/>
                <Route path='/news/edit/:id' element={<EditNews/>}/>
                <Route path='/sites' element={<MarketSites/>}/>
                <Route path='/FAQ' element={<FAQ/>}/>
                <Route path='/admin_package/:id' element={<AdminEditPackage/>}/>
            </Routes>
        </Layout>
    );
};

export default App;