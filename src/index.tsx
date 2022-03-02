import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle } from './styles/globalStyle';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
