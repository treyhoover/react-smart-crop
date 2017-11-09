import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Img from './Img';
import registerServiceWorker from './registerServiceWorker';
import src from "./img4.jpg";

ReactDOM.render(<Img src={src} x={0.55} y={0.15} />, document.getElementById('root'));
registerServiceWorker();
