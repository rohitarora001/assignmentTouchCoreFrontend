import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import FormState from './Context/FormState'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <FormState>
        <App />
      </FormState>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
