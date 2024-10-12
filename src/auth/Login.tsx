import * as React from 'react';
import {CssVarsProvider} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import GoogleIcon from '../component/icon/GoogleIcon';
import framesxTheme from "../theme";
import {FormattedMessage} from "react-intl";
import GitHubIcon from "../component/icon/GitHubIcon";


export default function Login() {
    const onGithubLogin = () => {
        window.location.href = "/oauth2/authorization/github"
    }

    const onGoogleLogin = () => {
        window.location.href = "/oauth2/authorization/google"
    }

    return (
        <CssVarsProvider theme={framesxTheme} disableTransitionOnChange>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s',
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: {xs: '100%', md: '50vw'},
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'black',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack sx={{gap: 4, mb: 2}}>
                            <Stack>
                                <Typography component="h1" level="h3">
                                    <FormattedMessage id="stay_safe_with"/>
                                </Typography>
                                <Typography level="body-sm">
                                </Typography>
                            </Stack>
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                onClick={onGithubLogin}
                                startDecorator={<GitHubIcon/>}
                            >
                                <FormattedMessage id="continue_with_github"/>
                            </Button>
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                onClick={onGoogleLogin}
                                startDecorator={<GoogleIcon/>}
                            >
                                <FormattedMessage id="continue_with_google"/>
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    left: {xs: 0, md: '50vw'},
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: 'url("openart-image_HJPhAC7j_1726942256956_raw.jpg")',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage: 'url("openart-image_wVbNncwY_1726942166699_raw.jpg")',
                    },
                })}
            >
            </Box>
        </CssVarsProvider>
    );
}