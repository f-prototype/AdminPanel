import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, counterReducer)

export const store =  configureStore({
    reducer: {
        counter: persistedReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});
export const persistor = persistStore(store)