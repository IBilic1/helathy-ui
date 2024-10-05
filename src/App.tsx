import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./component/Home";
import Dashboard from "./component/Dashboard";
import Appointments from "./component/appointment/Appointments";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Protected from "./component/route/Protected";
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from "react-intl";
import {messages} from "./messages";
import {LOCALES} from "./constants/locales";
import "dayjs/locale/en";
import "dayjs/locale/hr";
import ResponsiveAppBar from "./component/navigation/ResponsiveAppBar";
import Login from "./auth/Login";
import Error from "./component/Error";
import MyProfile from "./component/profile/MyProfile";
import Patients from "./component/patients/Patients";
import CssBaseline from "@mui/joy/CssBaseline";
import {useAuth} from "./auth/AuthProvider";
import SystemUserPatients from "./component/patients/SystemUserPatients";

function App() {
    const locale = LOCALES.CROATIAN;
    const auth = useAuth();
    const [language, setLanguage] = useState<string>(locale)

    return (
        <IntlProvider messages={messages[language]}
                      locale={language}
                      defaultLocale={language}>
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
                    <BrowserRouter>
                        <CssBaseline/>
                        <ResponsiveAppBar setLanguage={setLanguage} language={language}/>
                        <Routes>
                            <Route path="/" element={<Navigate to="home"/>}/>
                            <Route path="home" element={<Home/>}/>
                            <Route path="error" element={<Error/>}/>
                            <Route path="login" element={<Login/>}/>
                            {auth?.user && <><Route path="main"
                                                    element={<Protected
                                                        isAuthenticated={auth?.isAuthenticated()}
                                                        children={<Dashboard><Appointments/></Dashboard>}/>}/>
                                <Route path="profile"
                                       element={<Protected
                                           isAuthenticated={auth?.isAuthenticated()}
                                           children={<Dashboard><MyProfile/></Dashboard>}/>}/>
                                <Route path="patients"
                                       element={<Protected
                                           isAuthenticated={auth?.isAuthenticated()}
                                           isAdminProtected={true}
                                           isAdminAuthenticated={auth?.user?.role === 'DOCTOR'}
                                           children={<Dashboard><Patients/></Dashboard>}/>}/>
                                <Route path="appointments"
                                       element={<Protected
                                           isAuthenticated={auth?.isAuthenticated()}
                                           children={<Dashboard><Appointments/></Dashboard>}/>}/>
                                <Route path="patients-edit"
                                       element={<Protected
                                           isAuthenticated={auth?.isAuthenticated()}
                                           isSystemUserProtected={true}
                                           isSystemUserAuthenticated={auth?.user?.role === 'SYSTEM_USER'}
                                           children={<Dashboard><SystemUserPatients/></Dashboard>}/>}/></>}
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </BrowserRouter>
                </LocalizationProvider>
            </SnackbarProvider>
        </IntlProvider>
    );
}

export default App;
