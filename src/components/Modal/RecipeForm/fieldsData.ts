type FieldDataType = {
	fieldname: "title" | "source_url" | "image_url" | "publisher" | "cooking_time" | "servings";
	label: string;
	placeholder: string;
	error: string;
	validationProp: {
		required?: boolean;
		pattern?: RegExp;
		minLength?: number;
	};
};

export const fieldsData: FieldDataType[] = [
	{
		fieldname: "title",
		label: "Title",
		placeholder: "Vegetarian Spinach and Mushroom Lasagna Recipe",
		error: "Please, enter the meal title",
		validationProp: {
			required: true,
		},
	},
	{
		fieldname: "source_url",
		label: "Url",
		placeholder: "https://whatsgabycooking.com/three-meat-lasagna-recipe/",
		error: "Please, enter the valid URL",
		validationProp: {
			required: true,
			pattern: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
		},
	},
	{
		fieldname: "image_url",
		label: "Image URL",
		placeholder:
			"https://cdn.diffords.com/contrib/stock-images/2016/10/23/2016355e8fd0e14485791ab76d447efd4ef9.jpg",
		error: "Please, enter the valid image URL (.png or .jpg)",
		validationProp: {
			required: true,
			pattern: /(https?:\/\/.*\.(?:png|jpg))/i,
		},
	},
	{
		fieldname: "publisher",
		label: "Publisher",
		placeholder: "Whats Gaby Cooking",
		error: "The publisher must be at least 2 characters long",
		validationProp: {
			required: true,
			minLength: 2,
		},
	},
	{
		fieldname: "cooking_time",
		label: "Prep time",
		placeholder: "40",
		error: "Please, enter the cooking time of the meal",
		validationProp: { required: true },
	},
	{
		fieldname: "servings",
		label: "Servings",
		placeholder: "4",
		error: "Please, enter the number of servings",
		validationProp: { required: true },
	},
];
