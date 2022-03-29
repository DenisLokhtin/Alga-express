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
import FAQ from "./containers/FAQ/FAQ";
import AdminEditPackagePage from "./containers/AdminEditPackagePage/AdminEditPackagePage";
import AddFlight from "./containers/AddFlight/AddFlight";
import FlightsList from "./containers/FlightsList/FlightsList";
import UserProfileEdit from "./containers/UserProfileEdit/UserProfileEdit";
import UserPayment from "./components/UserPayment/UserPayment";
import WarehousemanStatusEdit from "./containers/WarehousemanStatusEdit/WarehousemanStatusEdit";
import AdminPaymentsProcessing from "./components/AdminPaymentsProcessing/AdminPaymentsProcessing";
import {
    aboutCompany,
    addCarousel,
    addFlightAdmin,
    addPaymentHandler,
    addPlayer,
    addUserPayment,
    addWareHouseAddress,
    adminPagePath,
    cargoCreateUser,
    contactsCompany,
    editBuyout,
    editCarousel,
    editInformation,
    editPackageAdmin,
    editPackageUser,
    editPages,
    editPlayer,
    editTariffGroup,
    editUserProfile,
    editWareHouseAddress,
    faqCompany,
    forgotPassword,
    howCompany,
    listFlightAdmin,
    listPaymentsAdmin,
    newPackageRegister,
    newsCompany,
    newsIdCompany,
    newUserRegister,
    orderBuyouts,
    processingTrackNumbersAdmin,
    resetPassword,
    root,
    rulesCompany,
    sitesCompany,
    userLogin,
    userPage,
    wareHouseCompany,
} from "./paths";
import OrderBuyout from "./containers/OrderBuyout/OrderBuyout";
import EditPages from "./containers/EditPages/EditPages";
import EditBuyout from "./components/EditBuyout/EditBuyout";
import AddPaymentAdmin from "./components/AddPaymentAdmin/AddPaymentAdmin";
import EditTariffGroup from "./components/EditTariffGroup/EditTariffGroup";
import WarehousePage from "./components/WarehousePage/WarehousePage";
import AddWareHouseAdmin from "./components/AddWareHouseAdmin/AddWareHouseAdmin";
import EditWareHouseAdmin from "./components/EditWareHouseAdmin/EditWareHouseAdmin";
import ProtectedRoutesForUser from "./components/ProtectedRoutes/ProtectedRoutesForUser/ProtectedRoutesForUser";
import ProtectedRoutesForAdmin from "./components/ProtectedRoutes/ProtectedRoutesForAdmin/ProtectedRoutesForAdmin";
import AdminPage from "./containers/AdminPage/AdminPage";
import UserPage from "./containers/UserPage/UserPage";
import UpdateDates from "./components/UI/UpdateDates/UpdateDates";
import CreateUser from "./containers/CreateUser/CreateUser";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import ProtectedRoutesForWarehouseman
    from "./components/ProtectedRoutes/ProtoectedRoutesForWarehouseman/ProtectedRoutesForWarehouseman";
import ProtectedRoutesForSuperAdmin
    from "./components/ProtectedRoutes/ProtectedRoutesForSuperAdmin/ProtectedRoutesForSuperAdmin";
import AddPlayerAdmin from "./components/AddPlayerAdmin/AddPlayerAdmin";
import EditPlayerAdmin from "./components/EditPlayerAdmin/EditPlayerAdmin";
import AddCarouselAdmin from "./components/AddCarouselAdmin/AddCarouselAdmin";
import EditCarouselAdmin from "./components/EditCarouselAdmin/EditCarouselAdmin";
import UserEditPackage from "./containers/UserEditPackage/UserEditPackage";
import EditInformation from "./components/EditInformation/EditInformation";

const App = () => {
    return (
        <UpdateDates>
            <Layout>
                <Routes>
                    <Route element={<ProtectedRoutesForUser/>}>
                        {/* Routes for registered user admin and superAdmin*/}
                        <Route path={newPackageRegister} element={<PackageRegister/>}/>
                        <Route path={editUserProfile} element={<UserProfileEdit/>}/>
                        <Route path={editPackageUser} element={<UserEditPackage/>}/>
                        <Route path={orderBuyouts} element={<OrderBuyout/>}/>
                        <Route path={userPage} element={<UserPage/>}/>
                        <Route path={editBuyout} element={<EditBuyout/>}/>
                        <Route path={addUserPayment} element={<UserPayment/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesForAdmin/>}>
                        {/* Routes for admin and superAdmin*/}
                        <Route path={adminPagePath} element={<AdminPage/>}/>
                        <Route path={editPages} element={<EditPages/>}/>
                        <Route path={editPackageAdmin} element={<AdminEditPackagePage/>}/>
                        <Route path={addPaymentHandler} element={<AddPaymentAdmin/>}/>
                        <Route path={addFlightAdmin} element={<AddFlight/>}/>
                        <Route path={listFlightAdmin} element={<FlightsList/>}/>
                        <Route path={addWareHouseAddress} element={<AddWareHouseAdmin/>}/>
                        <Route path={editWareHouseAddress} element={<EditWareHouseAdmin/>}/>
                        <Route path={listPaymentsAdmin} element={<AdminPaymentsProcessing/>}/>
                        <Route path={addUserPayment} element={<UserPayment/>}/>
                        <Route path={addCarousel} element={<AddCarouselAdmin/>}/>
                        <Route path={editCarousel} element={<EditCarouselAdmin/>}/>
                        <Route path={addPlayer} element={<AddPlayerAdmin/>}/>
                        <Route path={editPlayer} element={<EditPlayerAdmin/>}/>
                        <Route path={editInformation} element={<EditInformation/>}/>
                        <Route path={editBuyout} element={<EditBuyout/>}/>
                        <Route path={editTariffGroup} element={<EditTariffGroup/>}/>
                        <Route path={sitesCompany} element={<MarketSites/>}/>
                    </Route>

                    {/* Routes for warehouseman and SuperAdmin*/}
                    <Route element={<ProtectedRoutesForWarehouseman/>}>
                        <Route path={processingTrackNumbersAdmin} element={<WarehousemanStatusEdit/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesForSuperAdmin/>}>
                        <Route path={cargoCreateUser} element={<CreateUser/>}/>
                    </Route>

                    {/* Routes for not registered user */}
                    <Route path={wareHouseCompany} element={<WarehousePage/>}/>
                    <Route path={root} element={<HomePage/>}/>
                    <Route path={faqCompany} element={<FAQ/>}/>
                    <Route path={newUserRegister} element={<Register/>}/>
                    <Route path={userLogin} element={<Login/>}/>
                    <Route path={rulesCompany} element={<Rules/>}/>
                    <Route path={aboutCompany} element={<AboutUs/>}/>
                    <Route path={contactsCompany} element={<Contacts/>}/>
                    <Route path={howCompany} element={<HowItWorks/>}/>
                    <Route path={newsCompany} element={<News/>}/>
                    <Route path={newsIdCompany} element={<SingleNews/>}/>
                    <Route path={forgotPassword} element={<ForgotPassword/>}/>
                    <Route path={resetPassword} element={<ResetPassword/>}/>
                    <Route
                        path="*"
                        element={
                            <main style={{padding: "1rem"}}>
                                <h1>Page Not Found</h1>
                            </main>
                        }
                    />
                </Routes>
            </Layout>
        </UpdateDates>
    );
};

export default App;