import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mock,config } from '../config'

export const sitiAPI = createApi({
  reducerPath: 'sitiApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.REACT_APP_API_URL }),
  tagTypes: ['Siti'],
  endpoints: (builder) => ({
    gete: builder.query({
      query: (id) => ({
        method: "get",
        url: "api/getCategories",
      }),
    }),
    getSiti: builder.mutation({
      query: (body: any) => ({
        url: `city`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => {
        console.log(result,id)
        return [{ type: 'Siti', id }]
      },
      
    })
  }),
})
export const {useGetSitiMutation,useGeteQuery} = sitiAPI