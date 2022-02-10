import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICart, ICity, IPoint, IReqCart } from '@types';
import { defFetchBaseQuery } from '..';

export const CART_API_REDUCER_KEY = 'RTK_Cart';
export const RTKCart = createApi({
  reducerPath: CART_API_REDUCER_KEY,
  baseQuery: defFetchBaseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCartAll:builder.query<IReqCart[],void>({
      query: () => '/cart',
      providesTags: ['Cart']
     
    }),
    addToCart:builder.mutation<any,string>({
      query: (productId) => {
        return ({
          method: "POST",
          url: `/cart`,
          body: {
            productId
          }
        })
      },
      
    }),
    
  }),
})
export const {
  useAddToCartMutation,
  useGetCartAllQuery
  
} = RTKCart
