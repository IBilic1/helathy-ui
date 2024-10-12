import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import TwoSidedLayout from '../navigation/TwoSidedLayout';
import {FormattedMessage} from "react-intl";

export default function SecureLogin() {
    const onGithubLogin = () => {
        window.location.href = "/oauth2/authorization/github"
    }

    const onGoogleLogin = () => {
        window.location.href = "/oauth2/authorization/google"
    }

    return (
        <TwoSidedLayout>
            <Typography color="primary" sx={{fontSize: 'lg', fontWeight: 'lg'}}>
                <FormattedMessage id="stay_healthy_stay_secure"/>
            </Typography>
            <Typography
                level="h1"
                sx={{
                    fontWeight: 'xl',
                    fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
                }}
            >
                <FormattedMessage id="simplify_your_healthcare_with_secure_access"/>
            </Typography>
            <Typography
                textColor="text.secondary"
                sx={{fontSize: 'lg', lineHeight: 'lg'}}
            >
                <FormattedMessage id="manage_appointments_securely"/>
            </Typography>
            <Typography textColor="text.secondary" sx={{mt: 2}}>
                <FormattedMessage id="sign_in_securely_using"/>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    my: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Button variant="outlined" size="md" onClick={onGoogleLogin}>
                    <FormattedMessage id="continue_with_google"/>
                </Button>
                <Button variant="outlined" size="md" onClick={onGithubLogin}>
                    <FormattedMessage id="continue_with_github"/>
                </Button>
            </Box>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    textAlign: 'center',
                    alignSelf: 'stretch',
                    columnGap: 4.5,
                    '& > *': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        flex: 1,
                    },
                    [theme.breakpoints.up(834)]: {
                        textAlign: 'left',
                        '& > *': {
                            flexDirection: 'row',
                            gap: 1.5,
                            justifyContent: 'initial',
                            flexWrap: 'nowrap',
                            flex: 'none',
                        },
                    },
                })}
            >
            </Box>
        </TwoSidedLayout>
    );
}
