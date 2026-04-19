import { RouterProvider } from 'react-router-dom';
import router from './router';
import useThemeStore from './store/useThemeStore';
import getTheme from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient()
  const mode = useThemeStore((state) => state.mode)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <RouterProvider router={router} />

        </ThemeProvider>
      </QueryClientProvider>

    </>
  )
};
