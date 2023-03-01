import {configureStore} from '@reduxjs/toolkit';
// import { Authentication } from './reducers/reducer';
import { Authentication } from './reducers/reducer';
import { rootReducer } from './reducers/RootReducer';
export const store = configureStore({
    reducer: rootReducer,
})