import React from 'react';
import ReactDOM from 'react-dom';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import EmailContextProvider from './context/EmailContext';

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <EmailContextProvider>
        <App />
      </EmailContextProvider>
    </AuthContextProvider>
  </Router>,

  document.getElementById('root')
);
