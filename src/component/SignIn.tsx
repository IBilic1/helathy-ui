import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './Copyright';
import {useSignInMutation} from "../store/query/auth.query";
import {useNavigate} from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
    const [signIn, {data: singinData}] = useSignInMutation();
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: any = {};
        const data = new FormData(event.currentTarget);
        if (!data.get('email')) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.get('email') as string)) {
            errors.email = "Invalid email address";
        }
        if (!data.get('password')) {
            errors.password = "Password is required";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            signIn({
                email: data.get('email') as string,
                password: data.get('password') as string,
            })
        }
    };
    React.useEffect(() => {
        if (singinData) {
            localStorage.setItem('refresh_token', singinData?.refresh_token ?? undefined);
            localStorage.setItem('access_token', singinData?.access_token ?? undefined);
            navigate("/home")
        }
    }, [singinData])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Typography variant="body2" color="error"
                                sx={{paddingLeft: 2, fontSize: '0.8rem', marginTop: '0.5rem'}}>
                        {formErrors.email}
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Typography variant="body2" color="error"
                                sx={{paddingLeft: 2, fontSize: '0.8rem', marginTop: '0.5rem'}}>
                        {formErrors.password}
                    </Typography>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}