import { composeWithDevTools }          from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk                            from "redux-thunk";
import rootReducer                      from "./reducers/index";

const Store = createStore(
	rootReducer,
	{},
	// This includes redux devtools and includes thunk (Middleware to create async actions)
	composeWithDevTools(applyMiddleware(thunk))
);

export const getStoreData = () => Store.getState();

export default Store;
