import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { mangaReducer } from './mangaReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    manga: mangaReducer,
    user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));