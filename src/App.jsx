import { RouterProvider } from 'react-router-dom';
import router from './router';
import useThemeStore from './store/useThemeStore';
import getTheme from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18next.jsx';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

  const queryClient = new QueryClient()

export default function App() {
  const mode = useThemeStore((state) => state.mode)
  const { i18n } = useTranslation()
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.dir = dir;
  }, [i18n.language])
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
