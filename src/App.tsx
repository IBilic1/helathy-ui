import React, {useState} from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import SignInSide from "./component/SignInSide";
import SignIn from "./component/auth/SignIn";
import Dashboard from "./component/Dashboard";
import Appointments from "./component/appointment/Appointments";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Protected from "./component/route/Protected";
import Medicine from "./component/medicine/Medicine";
import PresciptionTable from "./component/prescription/PresciptionTable";
import {theme} from "./customTheme";
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from "react-intl";
import {messages} from "./messages";
import {LOCALES} from "./constants/locales";
import "dayjs/locale/en";
import "dayjs/locale/hr";
import {useGetUserQuery} from "./store/query/auth.query";

function App() {
    const locale = LOCALES.CROATIAN;
    const [language, setLanguage] = useState<string>(locale)
    const {data: user} = useGetUserQuery();
    console.log(user);

    return (
        <IntlProvider messages={messages[language]}
                      locale={language}
                      defaultLocale={language}>
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
                        <BrowserRouter>
                            <ResponsiveAppBar setLangugage={setLanguage} language={language}/>
                            <Routes>
                                <Route path="/" element={<Navigate to="home"/>}/>
                                <Route path="home" element={<SignInSide/>}/>
                                <Route path="sign-in" element={<SignIn/>}/>
                                <Route path="main" element={<Dashboard><Appointments/></Dashboard>}/>
                                <Route path="appointments"
                                       element={<Protected isLoggedIn={user?.email !== null}
                                                           children={<Dashboard><Appointments/></Dashboard>}/>}/>
                                <Route path="medicines"
                                       element={<Protected isLoggedIn={user?.email !== null} isAdminProtected={true}
                                                           children={<Dashboard><Medicine/></Dashboard>}/>}/>
                                <Route path="prescriptions"
                                       element={<Protected isLoggedIn={user?.email !== null}
                                                           children={<Dashboard><PresciptionTable/></Dashboard>}/>}/>
                            </Routes>
                        </BrowserRouter>
                        <CssBaseline/>
                    </LocalizationProvider>
                </ThemeProvider>
            </SnackbarProvider>
        </IntlProvider>
    );
}

export default App;
