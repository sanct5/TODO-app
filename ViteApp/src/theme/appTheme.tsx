import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { mainTheme } from './globalThemes';

export const AppTheme = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}