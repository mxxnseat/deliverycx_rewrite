import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '..';

export interface IAuthResponse{
  isAuth: boolean,
  access?: string
}




export const AUTH_API_REDUCER_KEY = 'RTK_Profile';
export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAccessToken: builder.query<IAuthResponse, string>({
      query: () => {
        return ({
          method: "POST",
          url: `profile/login`
        })
      },
    }),
    getUser: builder.query<IAuthResponse, string>({
      query: () => {
        return ({
          method: "POST",
          url: `profile/login`
        })
      },
    }),
  }),
});