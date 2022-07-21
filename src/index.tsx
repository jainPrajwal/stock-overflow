import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {  ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/errorBoundary/ErrorFallback';
const container = document.getElementById('root')!;
const root = createRoot(container);

console.log(`store `, store.getState())
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider resetCSS>
      <Router >
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <App />
        </ErrorBoundary>
      </Router>
    </ChakraProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
