import React from 'react';
import ReactDOM from 'react-dom';
import { RequestProvider } from 'react-request-hook';
import axios from 'axios';
import App from './App';

const axiosInstance = axios.create({
  baseURL: '/',
});

ReactDOM.render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
      <App />
    </RequestProvider>
  </React.StrictMode>,
  document.getElementById('root')
);