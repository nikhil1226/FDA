import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from '../reducers';

let middleware = [promise(), thunk];
const { hostname, hash } = window.location;
if (hostname === 'localhost' || hostname === 'mcbitss.dyndns.biz' || hash === '#/?debug=1') {
  middleware = [...middleware, createLogger()];
}

const middelware = compose(
  applyMiddleware(...middleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
);

export default createStore(reducer, middelware);
