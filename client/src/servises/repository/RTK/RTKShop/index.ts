import { createApi } from '@reduxjs/toolkit/query/react';
import { ICategory } from '@types';
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
    
  }),
});
export const {useGetCategoriesQuery} = RTKShop

