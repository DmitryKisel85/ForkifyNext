export type PreviewRecipeType = {
	id: string;
	image_url: string;
	publisher: string;
	title: string;
};

export type Ingredient = {
	quantity: number | null;
	unit: string;
	description: string;
};

export type RecipeType = {
	publisher: string;
	ingredients: Ingredient[];
	source_url: string;
	image_url: string;
	title: string;
	servings: number;
	cooking_time: string;
	id: string;
};

export type FormRecipeType = {
	publisher: string;
	ingredients: string[];
	source_url: string;
	image_url: string;
	title: string;
	servings: string;
	cooking_time: string;
	id: string;
};

export type ViewportSizes = {
	width: number;
	height: number;
};
