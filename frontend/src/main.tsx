import '@/styles/globals.css';



import App from '@/app';



import store from './redux/store';



import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


const ROOT = document.getElementById('__app')

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <CookiesProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CookiesProvider>
    </Provider>
  </BrowserRouter>,
  ROOT
)