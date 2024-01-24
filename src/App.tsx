import React, {useState} from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import SignInSide from "./component/SignInSide";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";
import Demo from "./component/Demo";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Protected from "./component/route/Protected";
import Medicine from "./component/medicine/Medicine";
import PresciptionTable from "./component/prescription/PresciptionTable";
import {theme} from "./theme";
import {SnackbarProvider} from 'notistack';
import {IntlProvider} from "react-intl";
import {messages} from "./messages";
import {LOCALES} from "./component/locales";

function App() {
    const access_token = localStorage.getItem('access_token');
    const locale = LOCALES.CROATIAN;
    const [a, setA] = useState<string>(locale)


    return (
        <IntlProvider messages={messages[a]}
                      locale={a}
                      defaultLocale={a}>
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BrowserRouter>
                        <ResponsiveAppBar setLangugage={setA}/>
                        <Routes>
                            <Route path="/" element={<Navigate to="home"/>}/>
                            <Route path="home" element={<SignInSide/>}/>
                            <Route path="sign-in" element={<SignIn/>}/>
                            <Route path="sign-up" element={<SignUp/>}/>
                            <Route path="main" element={<Dashboard><Demo/></Dashboard>}/>
                            <Route path="appointments" element={<Protected children={<Dashboard><Demo/></Dashboard>}
                                                                           isLoggedIn={access_token !== null}/>}/>
                            <Route path="medicines" element={<Protected children={<Dashboard><Medicine/></Dashboard>}
                                                                        isLoggedIn={access_token !== null}/>}/>
                            <Route path="prescriptions"
                                   element={<Protected children={<Dashboard><PresciptionTable/></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                        </Routes>
                    </BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                    </ThemeProvider>
                </LocalizationProvider>
            </SnackbarProvider>
        </IntlProvider>
    );
}

export default App;
