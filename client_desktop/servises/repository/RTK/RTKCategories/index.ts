import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '@types';
import { staticCategories } from 'domain/use-case/useCaseCategories';
import { defFetchBaseQuery } from '..';

export interface IAuthResponse{
  isAuth: boolean,
  access?: string
}




export const CATEGORIES_API_REDUCER_KEY = 'RTK_Categories';
export const RTKCategories = createApi({
  reducerPath: CATEGORIES_API_REDUCER_KEY,
  baseQuery: defFetchBaseQuery,
  endpoints: (builder) => ({
    getCategori: builder.query<ICategory[],string>({
      query: (organizationid) => {
        if (organizationid) {
          return ({
            method: "GET",
            url: `category/all?organizationId=${organizationid}`
          })
        } else {
          return ({
            method: "GET",
            url: `category/all?organizationId=${process.env.NEXT_PUBLIC_DEFAULT_ORG}`
          })
        }
        
      },
      //transformResponse: (response: ICategory[]) => [...response, staticCategories],
      
    }),
  }),
});
export const { useGetCategoriQuery } = RTKCategories