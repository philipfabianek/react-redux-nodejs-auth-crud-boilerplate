// Polyfills
import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";
import "./polyfills/polyfill";

// Styles
import './stylesheets/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { App } from "./routes/App";

import configureStore from "./store/configureStore";
const preloadedState = {
    user: window.__USER__,
    memories: window.__MEMORIES__
};
delete window.__USER__;
delete window.__MEMORIES__;
const store = configureStore(preloadedState);

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById("app")
);
