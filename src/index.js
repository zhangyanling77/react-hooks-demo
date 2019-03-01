import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import RouterComp from "./router";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RouterComp />, document.getElementById('root'));

serviceWorker.unregister();