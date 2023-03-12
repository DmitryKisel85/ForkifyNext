import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { PreviewRecipeType, RecipeType } from "types";

export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const API_KEY = `5e362293-af2b-43d1-933d-a137ca4b141b`;

type Recipes = {
	data: {
		recipes: PreviewRecipeType[];
	};
	status: string;
	results: number;
};

type SingleRecipe = {
	status: string;
	data: {
		recipe: RecipeType;
	};
};

export const forkifyApi = createApi({
	reducerPath: "forkifyApi",
	tagTypes: ["Recipes"],
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (builder) => ({
		getRecipes: builder.query<PreviewRecipeType[], string>({
			query: (searchTerm) => ({
				url: "/",
				params: {
					search: searchTerm,
					key: API_KEY,
				},
			}),
			transformResponse: (response: Recipes) => response.data.recipes,
			providesTags: ["Recipes"],
		}),
		getSingleRecipe: builder.query<RecipeType, string>({
			query: (id) => ({
				url: `/${id}`,
				params: {
					key: API_KEY,
				},
			}),
			transformResponse: (response: SingleRecipe) => response.data.recipe,
		}),
		addRecipe: builder.mutation({
			query: (body) => ({
				url: "/",
				params: {
					key: API_KEY,
				},
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}),
			invalidatesTags: ["Recipes"],
		}),
	}),
});

export const { useGetRecipesQuery, useGetSingleRecipeQuery, useAddRecipeMutation } = forkifyApi;
