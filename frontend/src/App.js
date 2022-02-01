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
import AddFlight from "./containers/AddFlight/AddFlight";
import FlightsList from "./containers/FlightsList/FlightsList";
import UserProfileEdit from "./containers/UserProfileEdit/UserProfileEdit";
import UserPayment from "./components/UserPayment/UserPayment";
import UserPayments from "./components/UserPayments/UserPayments";
import WarehousemanStatusEdit from "./containers/WarehousemanStatusEdit/WarehousemanStatusEdit";
import AdminPaymentsProcessing from "./components/AdminPaymentsProcessing/AdminPaymentsProcessing";

const App = () => {

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/user' element={<Register/>}/>
                <Route path='/user/package/info/:id' element={<SpecificPackage/>}/>
                <Route path='/user/package/register' element={<PackageRegister/>}/>
                <Route path='/user/package/edit/:id' element={<EditPackage/>}/>
                <Route path="/user/orders/history" element={<OrderHistory/>}/>
                <Route path='/user/userProfile/edit/:id' element={<UserProfileEdit/>}/>
                <Route path='/user/payments' element={<UserPayments/>}/>
                <Route path='/user/userProfile/payments/add' element={<UserPayment/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path="/orders/history" element={<OrderHistory/>}/>
                <Route path='/package/info/:id' element={<SpecificPackage/>}/>
                <Route path='/package/register' element={<PackageRegister/>}/>
                <Route path='/package/edit/:id' element={<EditPackage/>}/>
                <Route path='/warehouseman/status/edit' element={<WarehousemanStatusEdit/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/rules' element={<Rules/>}/>
                <Route path='/about' element={<AboutUs/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/how' element={<HowItWorks/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/news/:id' element={<SingleNews/>}/>
                <Route path='/news/edit/:id' element={<EditNews/>}/>
                <Route path='/sites' element={<MarketSites/>}/>
                <Route path='/faq' element={<FAQ/>}/>
                <Route path='/admin/package/:id' element={<AdminEditPackage/>}/>
                <Route path='/newFlight' element={<AddFlight/>}/>
                <Route path='/flights' element={<FlightsList/>}/>
                <Route path='/FAQ' element={<FAQ/>}/>
                <Route path='/cargo/payments' element={<AdminPaymentsProcessing/>}/>
                <Route path='/admin_package/:id' element={<AdminEditPackage/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <h1>Page Not Found</h1>
                        </main>
                    }
                />
            </Routes>
        </Layout>
    );
};

export default App;