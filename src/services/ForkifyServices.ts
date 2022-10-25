import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PreviewMeal, Recipe } from "../types/generalTypes";

export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = `5e362293-af2b-43d1-933d-a137ca4b141b`;
export const MODAL_CLOSE_SEC = 2.5;

type ReceivedDataFromGetMeals = {
    data: {
        recipes: PreviewMeal[];
    };
    status: string;
    results: number;
};

type RecievedDataFromGetSingleRecipe = {
    status: string;
    data: {
        recipe: Recipe;
    };
};

// Define a service using a base URL and expected endpoints
export const forkifyApi = createApi({
    reducerPath: "forkifyApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
    endpoints: (builder) => ({
        getMeals: builder.query<ReceivedDataFromGetMeals, string>({
            query: (searchTerm) => `?search=${searchTerm}&key=${KEY}`,
        }),
        getSingleRecipe: builder.query<RecievedDataFromGetSingleRecipe, string>({
            query: (id) => `${id}?key=${KEY}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMealsQuery, useGetSingleRecipeQuery } = forkifyApi;
