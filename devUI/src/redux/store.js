import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const enhancer = process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) : applyMiddleware(thunk);

const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

export default store;
