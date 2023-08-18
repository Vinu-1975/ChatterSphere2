import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import ChatProvider from './context/ChatProvider';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ChatProvider> */}
            <App />
      {/* </ChatProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

