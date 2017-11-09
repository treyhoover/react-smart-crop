import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import img from "./img4.jpg";

const boost = [
  {
    x: 650,
    y: 60,
    width: 275,
    height: 300,
    weight: 10,
  }
];

ReactDOM.render(<App src={img} boost={boost} />, document.getElementById('root'));
registerServiceWorker();
