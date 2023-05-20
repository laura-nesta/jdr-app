import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { clearState, loadState } from "./localStorage";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

const persistedStore = loadState();
export const history = createBrowserHistory();

export default createStore(
  rootReducer,
  persistedStore,
  applyMiddleware(routerMiddleware(history), thunk, logger)
);
