import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICity, IPoint } from "@types";
import { defFetchBaseQuery } from "..";

export const LOCATION_API_REDUCER_KEY = "RTK_Location";
export const RTKLocation = createApi({
    reducerPath: LOCATION_API_REDUCER_KEY,
    baseQuery: defFetchBaseQuery,
    tagTypes: ["Location"],
    endpoints: (builder) => ({
        getCiti: builder.query<ICity[], string>({
            query: (city) => ({
                method: "get",
                url: `city/all?search=${city}`
            })
        }),
        getPoints: builder.query<IPoint[], string>({
            query: (cityId) => ({
                method: "get",
                url: `organization/all?cityId=${cityId}`
            })
        }),
        getRecvisites: builder.mutation<IPoint[], string>({
          query: (cityId) => ({
              method: "get",
              url: `organization/recvisites?organizationId=${cityId}`
          })
      })
    })
});
export const { useGetCitiQuery, useGetPointsQuery,useGetRecvisitesMutation } = RTKLocation;
