import { rootReducer } from './modules/rootState';
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import sessionStorage from 'redux-persist/lib/storage/session'
const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['loginInfo', 'resumeStore']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares:any= [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
const persistor = persistStore(store);

export { store, persistor };
