import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {Link, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LOCALES} from "../constants/locales";
import {FormattedMessage} from "react-intl";
import {useGetUserQuery} from "../store/query/auth.query";

export type ResponsiveAppBarProps = {
    language: string;
    setLangugage: React.Dispatch<React.SetStateAction<string>>;
}

function ResponsiveAppBar({setLangugage, language}: ResponsiveAppBarProps) {
    const {data: user} = useGetUserQuery();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth={false}>

                <Toolbar disableGutters>
                    <Link href="/home" sx={{color: 'white', display: 'flex'}}>
                        <MedicalInformationIcon
                            sx={{display: {xs: 'none', md: 'flex'}, mr: 1, mt: 0.4, color: 'white'}}/>
                        <Typography
                            variant="h6"
                            align="justify"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            HEALTHY
                        </Typography>
                    </Link>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {user?.email && <Link href="/main" sx={{color: 'white', display: 'flex'}}>
                            <Typography
                                align="justify"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                <FormattedMessage id="remoteOffice"/>
                            </Typography>
                        </Link>}
                    </Box>
                    <Box>
                        <Select
                            label="Language"
                            defaultValue={language}
                            onChange={(event) => {
                                setLangugage(event.target.value === LOCALES.CROATIAN ? LOCALES.CROATIAN : LOCALES.ENGLISH);
                            }}
                        >
                            <MenuItem value={LOCALES.ENGLISH}>EN</MenuItem>
                            <MenuItem value={LOCALES.CROATIAN}>HRV</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <MenuItem>
                            {
                                !user?.email && <Link href="/sign-in" sx={{
                                    color: 'white',
                                    display: 'block',
                                    textTransform: "uppercase"
                                }}>
                                    <Typography textAlign="center"><FormattedMessage id="signIn"/></Typography>
                                </Link>
                            }
                            {
                                user?.email && <Link onClick={() => {
                                    localStorage.removeItem('access_token')
                                    localStorage.removeItem('refresh_token')
                                    navigate("/sign-in")
                                }}
                                                     sx={{color: 'white', display: 'block'}}>
                                    <Typography textAlign="center"><FormattedMessage id="signOut"/></Typography>
                                </Link>
                            }
                        </MenuItem>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;