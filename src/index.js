import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app';
import Resources from './components/Resources';
import reducers from './reducers';
import logger from 'redux-logger';
import requireAuth from './components/require_auth';

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<Route path="/resources" component={requireAuth(Resources)} />
  		</Route>
  	</Router>
  </Provider>, document.querySelector('.container'));
