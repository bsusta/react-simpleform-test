import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ListItems from './components/ListItems';
import AddItem from './components/addItem';
import EditItem from './components/EditItem';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase.js';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={ListItems} />
            <Route path="/additem" component={AddItem} />
            <Route path="/edititem/:itemId" exact component={EditItem} />
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
