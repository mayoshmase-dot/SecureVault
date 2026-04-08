import { RouterProvider } from 'react-router-dom';
import router from './router';
import useThemeStore from './store/useThemeStore';
import getTheme from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

export default function App() {
  const mode = useThemeStore((state) => state.mode)
  return (
    <>
      <ThemeProvider theme={getTheme(mode)}>
        <RouterProvider router={router} />
        <CssBaseline />
      </ThemeProvider> 

    </>
  )
};
