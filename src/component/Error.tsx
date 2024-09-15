import * as React from 'react';
import {CssVarsProvider} from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import framesxTheme from "../theme";


export default function Error() {
    return (
        <CssVarsProvider theme={framesxTheme} disableTransitionOnChange>
            <Box
                sx={(theme) => ({
                    minHeight: '100dvh',
                    width: '100%',
                    transition: 'width var(--Transition-duration)',
                    position: 'relative',
                    zIndex: 1,
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backdropFilter: 'blur(12px)',
                })}
            >
                <Box
                    sx={{
                        minHeight: '100dvh',
                        display: 'flex',
                        flexDirection: 'column',
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
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
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
                        <Stack sx={{gap: 6, mb: 10}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <Stack
                                    spacing={2}
                                    alignItems="center"
                                    sx={{
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                    }}
                                >
                                    <Typography level="h1" sx={{fontSize: '3rem', fontWeight: 'bold'}}>
                                        Oops, an error occurred!
                                    </Typography>
                                    <Typography sx={{fontSize: '1.2rem', opacity: 0.9}}>
                                        It looks like we took a wrong turn somewhere in cyberspace. The page you’re
                                        looking
                                        for doesn’t exist.
                                    </Typography>

                                </Stack>
                            </Box>
                        </Stack>

                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    )
        ;
}