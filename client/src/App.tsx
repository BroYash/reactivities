import React, {useEffect, useMemo, useState} from 'react'

import './App.css';
import axios from 'axios';
import Header from "./Components/Header";
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens } from './Components/theme/palette';
import { ColorModeContext } from './Components/theme/context';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('light');
  const [activites, setActivites] = useState([]);

  useEffect(() => {
      setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  useEffect(() => {
    axios.get('http://localhost:5000/activites')
      .then(res => {
        setActivites(res.data);
      }
      )
      .catch(err => console.log(err));
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Header />
        <ul>
          {activites.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
