import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from "@mui/joy/Box";
import framesxTheme from "../theme";
import {CssVarsProvider} from "@mui/joy/styles";

export type DashboardProps = {
    children: JSX.Element;
};

export default function Dashboard({children}: DashboardProps) {

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