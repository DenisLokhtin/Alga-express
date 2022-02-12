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
import {
    aboutCompany,
    addFlightAdmin, addPaymentHandler,
    addUserPayment,
    contactsCompany,
    editBuyout,
    editingSingleTrackNumber,
    editPackageAdmin,
    editPackageUser,
    editUserProfile,
    faqCompany,
    howCompany,
    listBuyouts,
    listFlightAdmin,
    listPaymentsAdmin,
    newPackageRegister,
    newsCompany,
    newsEditCompany,
    newsIdCompany,
    newUserRegister,
    orderBuyouts,
    packageHistory,
    packageInfoId,
    processingTrackNumbersAdmin,
    root,
    rulesCompany,
    sitesCompany,
    user,
    userLogin,
    userPackageHistory,
    userPaymentsList
} from "./paths";
import OrderBuyout from "./containers/OrderBuyout/OrderBuyout";
import SingleStatusEdit from "./containers/SingleStatusEdit/SingleStatusEdit";
import EditBuyout from "./components/EditBuyout/EditBuyout";
import BuyoutList from "./containers/BuyoutList/BuyoutList";
import AddPaymentAdmin from "./components/AddPaymentAdmin/AddPaymentAdmin";

const App = () => {

    return (
        <Layout>
            <Routes>
                <Route path={root} element={<HomePage/>} />
                <Route path={user} element={<Register/>}/>
                <Route path={packageInfoId} element={<SpecificPackage/>}/>
                <Route path={newPackageRegister} element={<PackageRegister/>}/>
                <Route path={editPackageUser} element={<EditPackage/>}/>
                <Route path={packageHistory} element={<OrderHistory/>}/>
                <Route path={editUserProfile} element={<UserProfileEdit/>}/>
                <Route path={userPaymentsList} element={<UserPayments/>}/>
                <Route path={addUserPayment} element={<UserPayment/>}/>
                <Route path={newUserRegister} element={<Register/>}/>
                <Route path={userPackageHistory} element={<OrderHistory/>}/>
                <Route path={processingTrackNumbersAdmin} element={<WarehousemanStatusEdit/>}/>
                <Route path={userLogin} element={<Login/>}/>
                <Route path={rulesCompany} element={<Rules/>}/>
                <Route path={aboutCompany} element={<AboutUs/>}/>
                <Route path={contactsCompany} element={<Contacts/>}/>
                <Route path={howCompany} element={<HowItWorks/>}/>
                <Route path={newsCompany} element={<News/>}/>
                <Route path={newsIdCompany} element={<SingleNews/>}/>
                <Route path={newsEditCompany} element={<EditNews/>}/>
                <Route path={sitesCompany} element={<MarketSites/>}/>
                <Route path={faqCompany} element={<FAQ/>}/>
                <Route path={editPackageAdmin} element={<AdminEditPackage/>}/>
                <Route path={addFlightAdmin} element={<AddFlight/>}/>
                <Route path={listFlightAdmin} element={<FlightsList/>}/>
                <Route path={listPaymentsAdmin} element={<AdminPaymentsProcessing/>}/>
                <Route path={orderBuyouts} element={<OrderBuyout/>}/>
                <Route path={editingSingleTrackNumber} element={<SingleStatusEdit/>}/>
                <Route path={editBuyout} element={<EditBuyout/>}/>
                <Route path={listBuyouts} element={<BuyoutList/>}/>
                <Route path={addPaymentHandler} element={<AddPaymentAdmin/>}/>
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