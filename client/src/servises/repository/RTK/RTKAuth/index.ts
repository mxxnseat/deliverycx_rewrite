import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { push } from 'connected-react-router';
import { AuthFailAction } from 'servises/redux/slice/profileSlice';
import { config } from 'servises/repository/config';

export interface IAuthResponse{
  isAuth: boolean,
  access?: string
}


const baseQuery = fetchBaseQuery({
  baseUrl: config.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");  
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    
    api.dispatch(AuthFailAction()) 
    api.dispatch(push('/')) 
    
  }
  if (result.error && result.error.status === 404) {
    api.dispatch(push('/404')) 
  }
  return result;
};



export const AUTH_API_REDUCER_KEY = 'RTK_Profile';
export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAccessToken: builder.query<IAuthResponse, string>({
      query: (code) => {
        return ({
          method: "POST",
          url: `profile/login`
        })
      },
    }),
  }),
});