import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
  // compose(
   
  //   (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
  //     compose
  // )
);

export default store;
