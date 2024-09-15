import React, {useState} from 'react';
import './App.css';
import {CssBaseline} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import SignInSide from "./component/Home";
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
import {useGetUserQuery} from "./store/query/auth.query";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import JoySignInSideTemplate from "./component/Login";
import Error from "./component/Error";
import MyProfile from "./component/profile/MyProfile";
import Patients from "./component/patients/Patients";

function App() {
    const locale = LOCALES.CROATIAN;
    const [language, setLanguage] = useState<string>(locale)
    const {data: user} = useGetUserQuery();
    console.log(user);
    console.log(setLanguage);

    return (
        <IntlProvider messages={messages[language]}
                      locale={language}
                      defaultLocale={language}>
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
                    <BrowserRouter>
                        <CssBaseline/>
                        <ResponsiveAppBar setLangugage={setLanguage} language={language}/>
                        <Routes>
                            <Route path="/" element={<Navigate to="home"/>}/>
                            <Route path="home" element={<SignInSide/>}/>
                            <Route path="error" element={<Error/>}/>
                            <Route path="sign-in" element={<JoySignInSideTemplate/>}/>
                            <Route path="main" element={<Dashboard><Appointments/></Dashboard>}/>
                            <Route path="profile" element={<Dashboard><MyProfile/></Dashboard>}/>
                            <Route path="patients" element={<Dashboard><Patients/></Dashboard>}/>
                            <Route path="appointments"
                                   element={<Protected isLoggedIn={user?.email !== null}
                                                       children={<Dashboard><Appointments/></Dashboard>}/>}/>
                        </Routes>
                    </BrowserRouter>
                </LocalizationProvider>
            </SnackbarProvider>
        </IntlProvider>
    );
}

export default App;
