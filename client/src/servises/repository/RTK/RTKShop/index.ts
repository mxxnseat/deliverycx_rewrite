import { createApi } from '@reduxjs/toolkit/query/react';
import { ICart, ICategory, IProduct, IResponseProductCard } from '@types';
import encodeQueryData from 'application/helpers/encodeQuery';
import { staticCategories } from 'domain/use-case/useCaseCategories';
import { baseQueryWithReauth } from '..';



export const SHOP_API_REDUCER_KEY = 'RTK_Shop';
export const RTKShop = createApi({
  reducerPath: SHOP_API_REDUCER_KEY,
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Shop'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[],string>({
      query: () => {
        return ({
          method: "GET",
          url: `api/getCategories`
        })
      },
      transformResponse: (response: ICategory[]) => [...response,staticCategories],
    }),
    getProducts:builder.query<IProduct[],any>({
      query: (query) => {
        return ({
          method: 'GET',
          url: `api/getProducts?${encodeQueryData(query)}`,
        })
      },
     
    }),
    getProductCart:builder.query<IResponseProductCard,any>({
      query: ({productId,organization}) => {
        return ({
          method: "get",
          url: `api/getProduct/${productId}?organization=${organization}`
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
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductCartQuery,
  useAddToCartMutation
} = RTKShop

