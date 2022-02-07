import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICart, ICategory, IProduct, IResponseProductCard } from "@types";
import encodeQueryData from "application/helpers/encodeQuery";
import { staticCategories } from "domain/use-case/useCaseCategories";
import { baseQueryWithReauth, defFetchBaseQuery } from "..";

export const SHOP_API_REDUCER_KEY = "RTK_Shop";
export const RTKShop = createApi({
    reducerPath: SHOP_API_REDUCER_KEY,
    baseQuery: defFetchBaseQuery,
    tagTypes: ["Shop"],
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], string>({
            query: (catId) => {
                if (catId === "61b1f708550ec40e2df28b5c") {
                    return {
                        method: "GET",
                        url: `/product/favorites`
                    };
                } else {
                    return {
                        method: "GET",
                        url: `product/all?categoryId=${catId}`
                    };
                }
            }
        }),
        getProductCart: builder.query<IProduct, any>({
            query: (productId) => {
                return {
                    method: "get",
                    url: `product/${productId}`
                };
            }
        }),
        searchProducts: builder.mutation<IProduct[], any>({
            query: ({ organizationId, searchString }) => {
                return {
                    method: "get",
                    url: `/product/search?organizationId=${organizationId}&searchString=${searchString}`
                };
            }
        })
    })
});
export const {
    useGetProductsQuery,
    useGetProductCartQuery,
    useSearchProductsMutation
} = RTKShop;
