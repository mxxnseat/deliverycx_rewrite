import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICart, ICategory, IProduct, IResponseProductCard } from '@types';
import encodeQueryData from 'application/helpers/encodeQuery';
import { staticCategories } from 'domain/use-case/useCaseCategories';
import { baseQueryWithReauth } from '..';
import { config } from "servises/repository/config"


export const SHOP_API_REDUCER_KEY = 'RTK_Shop';
export const RTKShop = createApi({
  reducerPath: SHOP_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: config.REACT_APP_API_URL }),
  tagTypes: ['Shop'],
  endpoints: (builder) => ({
    getProducts:builder.query<IProduct[],string>({
      query: (catId) => {
        return ({
          method: 'GET',
          url: `product/all?categoryId=${catId}`,
        })
      },
     
    }),
    getProductCart:builder.query<IProduct,any>({
      query: (productId) => {
        return ({
          method: "get",
          url: `product/${productId}`
        })
      },
     
    }),
    addToCart:builder.mutation<ICart,string>({
      query: (product) => {
        return ({
          method: "POST",
          url: `shop/addToCart`,
          body: {
            product
          }
        })
      },
     
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductCartQuery,
  useAddToCartMutation
} = RTKShop

