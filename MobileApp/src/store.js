import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from './reducers/authReducers';
import errorReducer from './reducers/errorReducers';

const rootReducer = combineReducers({
  auth:authReducer,
  error: errorReducer
})

const initialState = {};

const middleware = [thunk];

const configureStore = () => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default configureStore;
