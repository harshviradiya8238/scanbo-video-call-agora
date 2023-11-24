import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducers from "./Rootreducers";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middlewares = [thunk];
const persistConfig = {
    key: 'root',
    storage,
};
// const persistedReducer = persistReducer(persistConfig, RootReducers);

export const Store = createStore(
    RootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);
