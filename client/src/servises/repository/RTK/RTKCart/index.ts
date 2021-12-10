import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICart, ICity, IPoint } from '@types';
import { config } from "servises/repository/config"
import { defFetchBaseQuery } from '..';

export const CART_API_REDUCER_KEY = 'RTK_Cart';
export const RTKCart = createApi({
  reducerPath: CART_API_REDUCER_KEY,
  baseQuery: defFetchBaseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    addToCart:builder.mutation<ICart,string>({
      query: (productId) => {
        return ({
          method: "POST",
          url: `/cart/add`,
          body: {
            productId
          }
        })
      },
     
    }),
    
  }),
})
export const {useAddToCartMutation} = RTKCart
