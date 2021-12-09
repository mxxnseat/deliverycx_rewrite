import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICity, IPoint } from '@types';
import { config } from "servises/repository/config"

export const LOCATION_API_REDUCER_KEY = 'RTK_Location';
export const RTKLocation = createApi({
  reducerPath: LOCATION_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: config.REACT_APP_API_URL }),
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    getCiti: builder.query<ICity[],string>({
      query: (city) => ({
        method: "get",
        url: `city/all?search=${city}`
      }),
    }),
    getPoints: builder.query<IPoint[],string>({
      query: (cityId) => ({
        method: "get",
        url: `organization/all?cityId=${cityId}`
      }),
    }),
    
  }),
})
export const {useGetCitiQuery,useGetPointsQuery} = RTKLocation
