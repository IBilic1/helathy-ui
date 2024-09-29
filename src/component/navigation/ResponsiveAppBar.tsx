import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Container from '@mui/material/Container';
import {Link, MenuItem, Select} from "@mui/material";
import {LOCALES} from "../../constants/locales";
import {FormattedMessage} from "react-intl";
import {ColorSchemeToggle} from "../Home";
import {CssVarsProvider} from "@mui/joy/styles";
import framesxTheme from "../../theme";
import Divider from "@mui/material/Divider";
import List from "@mui/joy/List";
import Menu from "./Menu";
import {Drawer, ModalClose} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../../auth/AuthProvider";

export type ResponsiveAppBarProps = {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

function ResponsiveAppBar({setLanguage, language}: ResponsiveAppBarProps) {
    const auth = useAuth();
    const [open, setOpen] = React.useState(false);

    return (
        <AppBar position="absolute">
            <Container maxWidth={false}>
                <Drawer open={open} onClose={() => setOpen(false)}>
                    <ModalClose/>
                    <Divider/>
                    <List component="nav">
                        <Menu setOpen={setOpen}/>
                    </List>
                </Drawer>
                <Toolbar disableGutters>
                    {auth?.user?.email &&
                        <IconButton variant="outlined" color="neutral" onClick={() => setOpen(true)} sx={{mr: 4}}>
                            <MenuIcon/>
                        </IconButton>}
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
                                mt: 0.4,
                                fontSize: 'lg', lineHeight: 'lg',
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 1000,
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Healthy
                        </Typography>
                    </Link>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {auth?.user?.email && <Link href="/appointments" sx={{color: 'white', display: 'flex'}}>
                            <Typography
                                align="justify"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    mt: 0.4,
                                    display: {xs: 'none', md: 'flex'},
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: 'lg', lineHeight: 'lg'
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
                            variant="outlined"
                            color="primary"
                            sx={{maxHeight: 50}}
                            onChange={(event) => {
                                setLanguage(event.target.value === LOCALES.CROATIAN ? LOCALES.CROATIAN : LOCALES.ENGLISH);
                            }}
                        >
                            <MenuItem value={LOCALES.ENGLISH}>EN</MenuItem>
                            <MenuItem value={LOCALES.CROATIAN}>HRV</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <MenuItem>
                            {
                                !auth?.user?.email &&
                                <Link href="/login"
                                      sx={{
                                          color: 'white',
                                          display: 'block',
                                          textTransform: "uppercase"
                                      }}>
                                    <Typography textAlign="center">
                                        <FormattedMessage id="signIn"/>
                                    </Typography>
                                </Link>
                            }
                            {
                                auth?.user?.email &&
                                <Link
                                    sx={{color: 'white', display: 'block'}}
                                    onClick={() => {
                                        auth?.logout();
                                    }}>
                                    <Typography sx={{fontSize: 'lg', lineHeight: 'lg'}}>
                                        <FormattedMessage id="signOut"/>
                                    </Typography>
                                </Link>
                            }
                        </MenuItem>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <MenuItem>
                            <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
                                <ColorSchemeToggle/>
                            </CssVarsProvider>
                        </MenuItem>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;