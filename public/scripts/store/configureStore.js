import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../ducks/reducer';

export default function configureStore(initialState) {

  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware)
  )(createStore);

  const store = finalCreateStore(rootReducer);
  const history = syncHistoryWithStore(browserHistory, store);

  return {
    store,
    history
  };
}
