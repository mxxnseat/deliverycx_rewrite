/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, Middleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import counterSlice from './counterSlice';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const history = createBrowserHistory()
const persistConfig = {
  key: "delivery",
  storage,
  blacklist: [
    
  ],
  transforms: [
    createTransform(
      (inboundState, key) => {
        return inboundState;
      },
      (outboundState, key) => { 
        return outboundState
      },
      {
        whitelist: [
          
        ]
      }
    )
  ]
};

const createRootReducer = combineReducers({
  router: connectRouter(history),
  counter:counterSlice
})

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const customMiddleware:Middleware<Record<string,unknown>, RootState> = store => next => action  => {
  const res = next(action);
  return res;
};

const middlewares = [logger,routerMiddleware(history),customMiddleware];

const store = configureStore({
  reducer:persistedReducer,
  middleware:  (getDefaultMiddleware) => [...getDefaultMiddleware({
    serializableCheck: false
  }), ...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store);

export { store, persistor }
export type RootState = ReturnType<typeof createRootReducer>;
export type AppDispatch = typeof store.dispatch;

