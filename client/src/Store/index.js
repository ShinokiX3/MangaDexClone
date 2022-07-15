import { configureStore, combineReducers } from '@reduxjs/toolkit';
import menuReducer from './Slices/menuSlice';
import mangaReducer from './Slices/mangaSlice';

const rootReducer = combineReducers({
    menu: menuReducer, 
    manga: mangaReducer
})

export default configureStore({
    reducer: rootReducer
})