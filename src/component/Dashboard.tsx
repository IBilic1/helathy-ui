import * as React from 'react';
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/joy/Drawer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from "@mui/joy/Box";
import framesxTheme from "../theme";
import {CssVarsProvider} from "@mui/joy/styles";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export type DashboardProps = {
    children: JSX.Element;
};

export default function Dashboard({children}: DashboardProps) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssVarsProvider theme={framesxTheme} disableTransitionOnChange>
                <Box sx={(theme) => ({
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'black',
                    },
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                })}>
                    <Container maxWidth="lg" sx={{pt: 6, mt: 4, mb: 4}}>
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Container>
                </Box>
            </CssVarsProvider>
        </Box>
    );
}