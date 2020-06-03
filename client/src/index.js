import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter, Route } from 'react-router-dom';
//import { Provider } from 'react-redux';
//mport { createStore, applyMiddleware } from 'redux';
//import reduxThunk from 'redux-thunk';

import App from './Components/App';

// const store = createStore(
//     reducers,
//     {
//         auth: { authenticated: localStorage.getItem('token') }
//     },
//     applyMiddleware(reduxThunk)
// );

ReactDOM.render(
        <App />,
    document.querySelector('#root')
)