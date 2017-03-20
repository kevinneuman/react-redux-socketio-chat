import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, app);
