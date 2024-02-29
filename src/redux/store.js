import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { itemReducer } from "./reducers/ItemReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewareEnhancer = applyMiddleware(thunk, logger);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

const store = createStore(itemReducer, undefined, composedEnhancers);

export default store;
