import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { QueryProvider } from './lib/QueryProvider';
import App from './App';


const root = createRoot(document.getElementById('root')!);
root.render(
<React.StrictMode>
<QueryProvider>
	<ThemeProvider theme={createTheme()}>
		<CssBaseline />
		<App />
	</ThemeProvider>
</QueryProvider>
</React.StrictMode>
);