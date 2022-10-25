export type PreviewMeal = {
    id: string;
    image_url: string;
    publisher: string;
    title: string;
};

export type Ingredient = {
    quantity: number;
    unit: string;
    description: string;
};

export type Recipe = {
    publisher: string;
    ingredients: Ingredient[];
    source_url: string;
    image_url: string;
    title: string;
    servings: number;
    cooking_time: number;
    id: string;
};
