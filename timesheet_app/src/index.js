import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'
import SignUp from './components/SignUp'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(
  applyMiddleware(thunk)
))


ReactDOM.render(
  <BrowserRouter>
  <Provider store = {store}>
    <App>
      <Switch>
        <Route path = '/sign-up' component = {SignUp} />
      </Switch>
    </App>
  </Provider>
</BrowserRouter>





  , document.getElementById('root'));
registerServiceWorker();
