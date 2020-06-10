import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import Reducers from './Reducers';
import App from './Components/App';
import Signup from './Components/Auth/Signup';
import Signin from './Components/Auth/Signin';
import Mailbox from './Components/Messages/Mailbox';

const store = createStore(
    Reducers,
    {
        auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Mailbox} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
)