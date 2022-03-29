require('file-loader?name?=[name].[ext]!../public/index.html')
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Store';
import './scss/App.scss'

ReactDOM.render(
    <App store = {store} />,
    document.getElementById('root')
)