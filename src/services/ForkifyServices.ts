import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PreviewMeal, Recipe } from "types/generalTypes";

export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const KEY = `5e362293-af2b-43d1-933d-a137ca4b141b`;

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

export const forkifyApi = createApi({
	reducerPath: "forkifyApi",
	tagTypes: ["Recipes"],
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
	endpoints: (builder) => ({
		getRecipes: builder.query<ReceivedDataFromGetMeals, string>({
			query: (searchTerm) => `?search=${searchTerm}&key=${KEY}`,
			providesTags: (result) =>
				result
					? [
							...result.data.recipes.map(({ id }) => ({ type: "Recipes" as const, id })),
							{ type: "Recipes", id: "LIST" },
					  ]
					: [{ type: "Recipes", id: "LIST" }],
		}),
		getSingleRecipe: builder.query<RecievedDataFromGetSingleRecipe, string>({
			query: (id) => `${id}?key=${KEY}`,
		}),
		addRecipe: builder.mutation({
			query: (body) => ({
				url: `?key=${KEY}`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}),
			invalidatesTags: [{ type: "Recipes", id: "LIST" }],
		}),
	}),
});

export const { useGetRecipesQuery, useGetSingleRecipeQuery, useAddRecipeMutation } = forkifyApi;
