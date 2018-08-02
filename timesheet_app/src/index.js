import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SignInError from './components/SignInError'
import Dashboard from './components/Dashboard'
import {Home} from './components/Home'
import Client from './components/Client'
import Projects from './components/Projects'
import ProjectsList from './components/ProjectsList'
import ProjectsCompleteList from './components/ProjectsCompleteList'
import IndividualProject from './components/IndividualProject'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(
  applyMiddleware(thunk)
))


ReactDOM.render(
  <BrowserRouter>
  <Provider store = {store}>
    <App>
      <Switch>
        <Route exact path = '/sign-up' component = {SignUp} />
        <Route exact path = '/sign-in' component = {SignIn} />
        <Route exact path = '/signInError' component = {SignInError} />
        <Route exact path = '/dashboard' component = {Dashboard} />
        <Route exact path = '/clients' component = {Client} />
        <Route exact path = '/projects/:clientName/:clientID' component = {Projects} />
        <Route exact path = '/projects/:clientName/:clientID/:projectID' component = {IndividualProject} />
        <Route exact path = '/projects' component = {ProjectsCompleteList} />
        <Route exact path = '/' component = {Home} />
      </Switch>
    </App>
  </Provider>
</BrowserRouter>





  , document.getElementById('root'));
registerServiceWorker();
