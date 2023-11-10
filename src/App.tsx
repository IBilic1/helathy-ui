import React from 'react';
import './App.css';
import {colors, createTheme, ThemeProvider} from "@mui/material";
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

const theme = createTheme({
    typography: {
        fontFamily: 'Arial'
    },
    status: {
        danger: colors.red[500]
    },
    palette: {
        primary: {
            main: '#cd3d6f',
        },
        secondary: {
            main: '#8AAAE5',
        }
    }
})

function App() {
    const access_token = localStorage.getItem('access_token');

    return (
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <ResponsiveAppBar/>
                    <Routes>
                        <Route path="/" element={<Navigate to="home"/>}/>
                        <Route path="home" element={<SignInSide/>}/>
                        <Route path="sign-in" element={<SignIn/>}/>
                        <Route path="sign-up" element={<SignUp/>}/>
                        <Route path="main" element={<Dashboard><Demo/></Dashboard>}/>
                        <Route path="appointments" element={<Protected children={<Dashboard><Demo/></Dashboard>}
                                                                       isLoggedIn={access_token !== null} />}/>
                            </Routes>
                            </ThemeProvider>
                            </LocalizationProvider>
                            </BrowserRouter>
                            );
                        }

                               export default App;
