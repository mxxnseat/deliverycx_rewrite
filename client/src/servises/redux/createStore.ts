/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, Middleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { authApi, AUTH_API_REDUCER_KEY } from 'servises/repository/RTK/RTKAuth';
import profileSlice from './slice/profileSlice';
import locationSlice from './slice/locationSlice';
import { LOCATION_API_REDUCER_KEY, RTKLocation } from 'servises/repository/RTK/RTKLocation';
import { SHOP_API_REDUCER_KEY, RTKShop } from 'servises/repository/RTK/RTKShop';

const history = createBrowserHistory()
const persistConfig = {
  key: "delivery",
  storage,
  blacklist: [
    AUTH_API_REDUCER_KEY,
    LOCATION_API_REDUCER_KEY,
    SHOP_API_REDUCER_KEY,
    profileSlice.name,
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
          locationSlice.name
        ]
      }
    )
  ]
};

const createRootReducer = combineReducers({
  //router: connectRouter(history),
  [profileSlice.name]:profileSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [RTKLocation.reducerPath]: RTKLocation.reducer,
  [RTKShop.reducerPath]: RTKShop.reducer
})

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const customMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  
  
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

