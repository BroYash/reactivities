import React, {useEffect, useMemo, useState} from 'react'
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens } from './palette';
import { ColorModeContext } from './context';

function Theme() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<PaletteMode>('light');

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const colorMode = useMemo(
        () => ({
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
            setMode((prevMode: PaletteMode) =>
            prevMode === 'light' ? 'dark' : 'light',
            );
        },
        }),
        [],
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
          </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Theme