import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import rootReducer from './reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            promiseMiddleware,
            loggerMiddleware
        ), autoRehydrate()
    );
    return createStore(rootReducer, initialState, enhancer);
}

export default store = configureStore({});