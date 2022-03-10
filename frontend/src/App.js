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
import EditNews from "./containers/EditNews/EditNews";
import AdminEditPackagePage from "./containers/AdminEditPackagePage/AdminEditPackagePage";
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
    resetPassword,
    root,
    rulesCompany,
    sitesCompany,
    tariffs,
    userLogin,
    userPage,
    userPaymentsList,
    wareHouseCompany,
} from "./paths";
import OrderBuyout from "./containers/OrderBuyout/OrderBuyout";
import EditPages from "./containers/EditPages/EditPages";
import EditBuyout from "./components/EditBuyout/EditBuyout";
import BuyoutList from "./containers/BuyoutList/BuyoutList";
import AddPaymentAdmin from "./components/AddPaymentAdmin/AddPaymentAdmin";
import EditTariffGroup from "./components/EditTariffGroup/EditTariffGroup";
import WarehousePage from "./components/WarehousePage/WarehousePage";
import AddWareHouseAdmin from "./components/AddWareHouseAdmin/AddWareHouseAdmin";
import EditWareHouseAdmin from "./components/EditWareHouseAdmin/EditWareHouseAdmin";
import TariffsPage from "./containers/TariffPage/TariffPage";
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

const App = () => {
    return (
        <UpdateDates>
            <Layout>
                <Routes>
                    <Route element={<ProtectedRoutesForUser/>}>
                        {/* Routes for registered user admin and superAdmin*/}
                        <Route path={packageHistory} element={<OrderHistory/>}/>
                        <Route path={userPaymentsList} element={<UserPayments/>}/>
                        <Route path={newPackageRegister} element={<PackageRegister/>}/>
                        <Route path={editUserProfile} element={<UserProfileEdit/>}/>
                        <Route path={sitesCompany} element={<MarketSites/>}/>
                        <Route path={editPackageUser} element={<UserEditPackage/>}/>
                        <Route path={packageInfoId} element={<SpecificPackage/>}/>
                        <Route path={orderBuyouts} element={<OrderBuyout/>}/>
                        <Route path={listBuyouts} element={<BuyoutList/>}/>
                        <Route path={addUserPayment} element={<UserPayment/>}/>
                    </Route>
                    <Route element={<ProtectedRoutesForAdmin/>}>
                        {/* Routes for admin and superAdmin*/}
                        <Route path={adminPagePath} element={<AdminPage/>}/>
                        <Route path={newsEditCompany} element={<EditNews/>}/>
                        <Route path={editPages} element={<EditPages/>}/>
                        <Route path={editPackageAdmin} element={<AdminEditPackagePage/>}/>
                        <Route path={addPaymentHandler} element={<AddPaymentAdmin/>}/>
                        <Route path={addFlightAdmin} element={<AddFlight/>}/>
                        <Route path={listFlightAdmin} element={<FlightsList/>}/>
                        <Route path={addWareHouseAddress} element={<AddWareHouseAdmin/>}/>
                        <Route path={editWareHouseAddress} element={<EditWareHouseAdmin/>}/>
                        <Route path={listPaymentsAdmin} element={<AdminPaymentsProcessing/>}/>
                        <Route path={addUserPayment} element={<UserPayment/>}/>
                        <Route path={addWareHouseAddress} element={<AddWareHouseAdmin/>}/>
                        <Route path={addCarousel} element={<AddCarouselAdmin/>}/>
                        <Route path={editCarousel} element={<EditCarouselAdmin/>}/>
                        <Route path={editWareHouseAddress} element={<EditWareHouseAdmin/>}/>
                        <Route path={addPlayer} element={<AddPlayerAdmin/>}/>
                        <Route path={editPlayer} element={<EditPlayerAdmin/>}/>
                    </Route>
                    {/* Routes for warehouseman and SuperAdmin*/}
                    {/*Приватные роуты можно сделать одним компонентом потом фикс*/}
                    <Route element={<ProtectedRoutesForWarehouseman/>}>
                        <Route path={processingTrackNumbersAdmin} element={<WarehousemanStatusEdit/>}/>
                    </Route>
                    <Route element={<ProtectedRoutesForSuperAdmin/>}>
                        <Route path={cargoCreateUser} element={<CreateUser/>}/>
                    </Route>
                    <Route path={editBuyout} element={<EditBuyout/>}/>
                    <Route path={wareHouseCompany} element={<WarehousePage/>}/>
                    <Route path={editTariffGroup} element={<EditTariffGroup/>}/>
                    <Route path={tariffs} element={<TariffsPage/>}/>
                    {/* Routes for not registered user */}
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
                    <Route path={userPage} element={<UserPage/>}/>
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