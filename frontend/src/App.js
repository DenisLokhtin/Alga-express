import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import MarketSites from "./containers/MarketSites/MarketSites";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' exact element={<Register/>}/>
                <Route path='/' exact element={<MarketSites/>}/>
            </Routes>
        </Layout>
    );
};

export default App;