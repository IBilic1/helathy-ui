import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";


function ResponsiveAppBar() {
    const access_token = localStorage.getItem('access_token');
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
                       {access_token && <Link href="/appointments" sx={{color: 'white', display: 'flex'}}>
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
                               REMOTE OFFICE
                           </Typography>
                       </Link>}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <MenuItem>
                            {
                                !access_token && <Link href="/sign-in" sx={{color: 'white', display: 'block'}}>
                                    <Typography textAlign="center">SING IN</Typography>
                                </Link>
                            }
                            {
                                access_token && <Link onClick={() => {
                                    localStorage.removeItem('access_token')
                                    localStorage.removeItem('refresh_token')
                                    navigate("/sign-in")
                                }}
                                                      sx={{color: 'white', display: 'block'}}>
                                    <Typography textAlign="center">SIGN OUT</Typography>
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