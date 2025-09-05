import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryProvider } from './lib/QueryProvider';
import App from './App';


const root = createRoot(document.getElementById('root')!);
root.render(
<React.StrictMode>
<QueryProvider>
<ChakraProvider>
<App />
</ChakraProvider>
</QueryProvider>
</React.StrictMode>
);