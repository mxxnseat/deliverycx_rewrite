import { combineReducers, Middleware } from 'redux'
import { configureStore, getDefaultMiddleware, isRejectedWithValue } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { authApi, AUTH_API_REDUCER_KEY } from 'servises/repository/RTK/RTKAuth';
import { fetchUser } from './slice/profileSlice';
import { LOCATION_API_REDUCER_KEY, RTKLocation } from 'servises/repository/RTK/RTKLocation';
import locationSlice from './slice/locationSlice';
import { CATEGORIES_API_REDUCER_KEY, RTKCategories } from 'servises/repository/RTK/RTKCategories';
import ShopSlice from './slice/shopSlice';
import { RTKShop, SHOP_API_REDUCER_KEY } from 'servises/repository/RTK/RTKShop';
import cartSlice, { fetchAllCart } from './slice/cartSlice';
import bankCardSlice from './slice/bankCardSlice';



const persistConfig = {
  key: "delivery",
  storage,
  blacklist: [
    AUTH_API_REDUCER_KEY,
    LOCATION_API_REDUCER_KEY,
    CATEGORIES_API_REDUCER_KEY,
    SHOP_API_REDUCER_KEY,
    ShopSlice.name,
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
          locationSlice.name,
          cartSlice.name,
        ]
      }
    )
  ]
};

const createRootReducer = combineReducers({
  //router: connectRouter(history),
  [RTKLocation.reducerPath]: RTKLocation.reducer,
  [RTKCategories.reducerPath]:RTKCategories.reducer,
  [RTKShop.reducerPath]: RTKShop.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [ShopSlice.name]: ShopSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [bankCardSlice.name]:bankCardSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const customMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  if (isRejectedWithValue(action)) {
    console.log(action);
  }
  
  const res = next(action);
  return res;
};

const middlewares = [customMiddleware];
if (process.env.NODE_ENV !== 'production') {
  //middlewares.push(logger)
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

