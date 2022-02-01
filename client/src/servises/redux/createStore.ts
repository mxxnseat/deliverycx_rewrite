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
import profileSlice, { fetchUser } from './slice/profileSlice';
import locationSlice from './slice/locationSlice';
import { LOCATION_API_REDUCER_KEY, RTKLocation } from 'servises/repository/RTK/RTKLocation';
import { SHOP_API_REDUCER_KEY, RTKShop } from 'servises/repository/RTK/RTKShop';
import ShopSlice from './slice/shopSlice';
import { CATEGORIES_API_REDUCER_KEY, RTKCategories } from 'servises/repository/RTK/RTKCategories';
import cartSlice, { fetchAllCart } from './slice/cartSlice';
import { CART_API_REDUCER_KEY, RTKCart } from 'servises/repository/RTK/RTKCart';
import bankCardSlice from './slice/bankCardSlice';

const history = createBrowserHistory()
const persistConfig = {
  key: "delivery",
  storage,
  blacklist: [
    AUTH_API_REDUCER_KEY,
    LOCATION_API_REDUCER_KEY,
    SHOP_API_REDUCER_KEY,
    CATEGORIES_API_REDUCER_KEY,
    CART_API_REDUCER_KEY,
    profileSlice.name,
    ShopSlice.name,
    cartSlice.name,
    bankCardSlice.name
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
  [authApi.reducerPath]: authApi.reducer,
  [RTKLocation.reducerPath]: RTKLocation.reducer,
  [RTKCategories.reducerPath]:RTKCategories.reducer,
  [RTKShop.reducerPath]: RTKShop.reducer,
  [RTKCart.reducerPath]:RTKCart.reducer,
  [profileSlice.name]:profileSlice.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [ShopSlice.name]: ShopSlice.reducer,
  [cartSlice.name]:cartSlice.reducer,
  [bankCardSlice.name]:bankCardSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const customMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  
  
  const res = next(action);
  return res;
};

const middlewares = [routerMiddleware(history), customMiddleware];
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
  await store.dispatch(fetchAllCart() as any) 
});

export { store, persistor }
export type RootState = ReturnType<typeof createRootReducer>;
export type AppDispatch = typeof store.dispatch;

