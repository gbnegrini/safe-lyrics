import React from 'react';
import ReactDOM from 'react-dom';
import './sketchy.css';
import App from './App';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
