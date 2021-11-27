import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {RequestProvider} from 'react-request-hook'
import axios from 'axios'

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:3000/api/'  
  baseURL: '/'
})

ReactDOM.render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
     <App/>
    </RequestProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
