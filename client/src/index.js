import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import appliedTheme from './theme/theme';
import App from './App';
import ErrorBoundary from './features/Error/components';
import store from './store';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={appliedTheme}>
        <ErrorBoundary>
          <ScrollToTop />
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
