import * as React from 'react';
import Container from '@mui/material/Container';
import {Button} from "@mui/material";

export default function SignIn() {
    const onGithubLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/github"
    }

    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={onGithubLogin}>Login with github</Button>
        </Container>
    );
}