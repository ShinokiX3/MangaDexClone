import { configureStore, combineReducers } from '@reduxjs/toolkit';

import menuReducer from './Slices/menuSlice';
import mangaReducer from './Slices/mangaSlice';
import suggestReducer from './Slices/suggestSlice';
import titleReducer from './Slices/titlesSlice';

const rootReducer = combineReducers({
    menu: menuReducer, 
    manga: mangaReducer,
    suggest: suggestReducer,
    title: titleReducer
})

export default configureStore({
    reducer: rootReducer
})