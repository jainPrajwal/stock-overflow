import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";
const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider resetCSS>
      <Router >

        <App />

      </Router>
    </ChakraProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
