import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3ModalProvider } from './web3/Web3Provider';
import { WalletProvider } from '../src/context/WalletContext';
import { BrowserRouter } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Web3ModalProvider>
      <WalletProvider>
        <TranslationProvider>
          <App />
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </TranslationProvider>
      </WalletProvider>
    </Web3ModalProvider>
  </BrowserRouter>
);
