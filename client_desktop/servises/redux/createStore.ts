import { combineReducers, Middleware } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { authApi, AUTH_API_REDUCER_KEY } from 'servises/repository/RTK/RTKAuth';
import { fetchUser } from './slice/profileSlice';
import { LOCATION_API_REDUCER_KEY, RTKLocation } from 'servises/repository/RTK/RTKLocation';
import locationSlice from './slice/locationSlice';



const persistConfig = {
  key: "delivery",
  storage,
  blacklist: [
    AUTH_API_REDUCER_KEY,
    LOCATION_API_REDUCER_KEY,
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
  [RTKLocation.reducerPath]: RTKLocation.reducer,
  [locationSlice.name]: locationSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const customMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  
  
  const res = next(action);
  return res;
};

const middlewares = [customMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const store = configureStore({
  reducer:persistedReducer,
  middleware:  (getDefaultMiddleware) => [...getDefaultMiddleware({
    serializableCheck: false
  }), ...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store, undefined, async () => {
  await store.dispatch(fetchUser() as any)
  //await store.dispatch(fetchAllCart() as any) 
});

export { store, persistor }
export type RootState = ReturnType<typeof createRootReducer>;
export type AppDispatch = typeof store.dispatch;

