import React from 'react';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string
        }
    }

    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color']
        }
    }
    interface ThemeOptions {
        typography: {
            fontFamily: string,
            textAlign: string,
        }
    }
}