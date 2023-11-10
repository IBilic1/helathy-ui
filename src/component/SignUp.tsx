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
import Copyright from "./Copyright";
import {useSignUpMutation} from "../store/query/auth.query";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [signUp, {data: singUpData}] = useSignUpMutation();
    const [role, setRole] = useState<"ADMIN" | "USER">("USER")
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const errors: any = {};
        if (!data.get('firstName')) {
            errors.firstName = "First Name is required";
        }
        if (!data.get('lastName')) {
            errors.lastName = "Last Name is required";
        }
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
            signUp({
                email: data.get('email') as string,
                password: data.get('password') as string,
                firstName: data.get('firstName') as string,
                lastName: data.get('lastName') as string,
                role
            });
        }
    };

    React.useEffect(() => {
        if (singUpData) {
            navigate("/sign-in")
        }
    }, [singUpData])

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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                            <Typography variant="body2" color="error" sx={{ paddingLeft: 2, fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {formErrors.firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                            <Typography variant="body2" color="error" sx={{ paddingLeft: 2, fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {formErrors.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <Typography variant="body2" color="error" sx={{ paddingLeft: 2, fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {formErrors.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                            <Typography variant="body2" color="error" sx={{ paddingLeft: 2, fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {formErrors.password}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                    color="primary"
                                    onChange={((checked) => {
                                        if (checked) {
                                            setRole("ADMIN")
                                        } else {
                                            setRole("USER")
                                        }
                                    })}/>}
                                label="I am doctor"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}