import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Container, Link} from '@mui/material';

export default function SignInSide() {

    return (
        <Grid container component="main" sx={{height: '93.5vh'}}>
            <CssBaseline/>
            <Grid item xs={5}>
                <Box
                    sx={{
                        my: 20,
                        mx: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="left"
                            color="text.primary"
                            gutterBottom
                        >
                            WELCOME TO HEALTHY
                        </Typography>
                        <Typography variant="h5" align="justify" color="text.secondary" component="p">
                            Are you ready to unlock a world of possibilities? We're thrilled to have you here at
                            Healthy, your gateway to an incredible digital experience.
                        </Typography>
                        <Button variant="contained" size="large" sx={{
                            my: 6,
                        }}>
                            <Link href="/sign-up" sx={{color: 'white', display: 'flex'}}>
                                Sign Up Now
                            </Link>
                        </Button>
                    </Container>
                </Box>
            </Grid>
            <Grid
                item
                md={7}
                sx={{
                    backgroundImage: 'url(https://img.freepik.com/free-vector/online-doctor-with-clipboard_23-2148519013.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                }}
            />

        </Grid>
    )
        ;
}