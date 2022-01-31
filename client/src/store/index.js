import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// composeWithDevTools >> sirve igua que la funcion de compose que se agregaba el 
// "window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()"
// solo que ya lo hace