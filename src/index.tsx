import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
