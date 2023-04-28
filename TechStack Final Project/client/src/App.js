import React from 'react'
import { useEffect, useState } from 'react';
import Router from './core/Router';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#FFB040'
    }
  }
});

function App() {
  const role = useMemo(() => {
      return localStorage.getItem('ROLE');
  }, [localStorage.getItem('ROLE')])

  return (
    <ThemeProvider theme={theme}>
      <Router role={role} />
    </ThemeProvider>
  )
}

export default App;