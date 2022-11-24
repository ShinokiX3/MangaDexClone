import { configureStore, combineReducers } from '@reduxjs/toolkit';

import menuReducer from './Slices/menuSlice';
import mangaReducer from './Slices/mangaSlice';
import suggestReducer from './Slices/suggestSlice';
import titleReducer from './Slices/titlesSlice';
import userReducer from './Slices/userSlice';

const rootReducer = combineReducers({
    menu: menuReducer, 
    manga: mangaReducer,
    suggest: suggestReducer,
    title: titleReducer,
    user: userReducer
})

export default configureStore({
    reducer: rootReducer
})