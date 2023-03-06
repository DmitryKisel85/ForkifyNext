import cx from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { FaFileUpload, FaRegThumbsUp, FaRegTimesCircle } from "react-icons/fa";

import { useAddRecipeMutation } from "services/ForkifyServices";

import type { RecipeFromForm } from "types";

import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";

import s from "./recipeForm.module.scss";

const RecipeForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RecipeFromForm>({
		mode: "onSubmit",
	});

	const [addRecipe, { error, isLoading, isSuccess }] = useAddRecipeMutation();

	if (isLoading) return <Spinner />;
	if (error) {
		if ("status" in error) {
			// you can access all properties of `FetchBaseQueryError` here
			const errMsg = "error" in error ? error.error : JSON.stringify(error.data);

			return (
				<RenderMessage
					messageText={`Something goes wrong! ${errMsg}. Please, try again!`}
					messageIcon={<FaRegTimesCircle />}
				/>
			);
		} else {
			// you can access all properties of `SerializedError` here
			return (
				<RenderMessage
					messageText={`Something goes wrong! ${error.message}. Please, try again!`}
					messageIcon={<FaRegTimesCircle />}
				/>
			);
		}
	}

	if (isSuccess) return <RenderMessage messageText='Uploading successful!' messageIcon={<FaRegThumbsUp />} />;

	const handleAddRecipe = async (body: any) => {
		await addRecipe(body).unwrap();
	};

	const onSubmit: SubmitHandler<RecipeFromForm> = (data) => {
		const { ingredients } = data;

		const newIngredients = ingredients
			.filter((ingredient) => ingredient !== "")
			.map((ing) => {
				const ingArr = ing.split(",").map((el) => el.trim());
				const [quantity, unit, description] = ingArr;
				return { quantity: quantity ? +quantity : null, unit, description };
			});

		const newData = {
			...data,
			ingredients: newIngredients,
		};

		handleAddRecipe(newData);
		reset();
	};

	return (
		<form className={s.upload} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.uploadColumn}>
				<h3 className={s.uploadHeading}>Recipe data</h3>

				<div className={s.formGroup}>
					<label>Title</label>
					<input
						className={s.formInput}
						placeholder='Vegetarian Spinach and Mushroom Lasagna Recipe'
						{...register("title", {
							required: true,
						})}
					/>
					{errors?.title && <p className={s.formError}>Please, enter the meal title</p>}
				</div>

				<div className={s.formGroup}>
					<label>URL</label>
					<input
						className={s.formInput}
						placeholder='https://whatsgabycooking.com/three-meat-lasagna-recipe/'
						{...register("source_url", {
							required: true,
							pattern:
								/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
						})}
					/>
					{errors?.source_url && <p className={s.formError}>Please, enter the valid URL</p>}
				</div>

				<div className={s.formGroup}>
					<label>Image URL</label>
					<input
						className={s.formInput}
						placeholder='https://cdn.diffords.com/contrib/stock-images/2016/10/23/2016355e8fd0e14485791ab76d447efd4ef9.jpg'
						{...register("image_url", {
							required: true,
							pattern: /(https?:\/\/.*\.(?:png|jpg))/i,
						})}
					/>
					{errors?.image_url && (
						<p className={s.formError}>Please, enter the valid image URL (.png or .jpg)</p>
					)}
				</div>

				<div className={s.formGroup}>
					<label>Publisher</label>
					<input
						className={s.formInput}
						placeholder='Whats Gaby Cooking'
						{...register("publisher", {
							required: true,
							minLength: 4,
						})}
					/>
					{errors?.publisher && (
						<p className={s.formError}>The publisher must be at least 4 characters long</p>
					)}
				</div>

				<div className={s.formGroup}>
					<label>Prep time</label>
					<input
						className={s.formInput}
						placeholder='40'
						type='number'
						{...register("cooking_time", { required: true })}
					/>
					{errors?.cooking_time && <p className={s.formError}>Please, enter the cooking time of the meal</p>}
				</div>

				<div className={s.formGroup}>
					<label>Servings</label>
					<input
						className={s.formInput}
						placeholder='4'
						type='number'
						{...register("servings", { required: true })}
					/>
					{errors?.servings && <p className={s.formError}>Please, enter the number of servings</p>}
				</div>
				<input type='hidden' {...register("id")} value={uuidv4()} />
			</div>

			<div className={s.uploadColumn}>
				<h3 className={s.uploadHeading}>Ingredients</h3>

				<div className={s.formGroup}>
					<label>Ingredient 1</label>
					<input
						className={s.formInput}
						{...register("ingredients.0", {
							minLength: 3,
							required: true,
						})}
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
					{errors?.ingredients && <p className={s.formError}>Please, enter at least one ingredient'</p>}
				</div>
				<div className={s.formGroup}>
					<label>Ingredient 2</label>
					<input
						className={s.formInput}
						{...register("ingredients.1")}
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
				</div>
				<div className={s.formGroup}>
					<label>Ingredient 3</label>
					<input
						className={s.formInput}
						{...register("ingredients.2")}
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
				</div>
				<div className={s.formGroup}>
					<label>Ingredient 4</label>
					<input
						className={s.formInput}
						{...register("ingredients.3")}
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
				</div>
				<div className={s.formGroup}>
					<label>Ingredient 5</label>
					<input
						className={s.formInput}
						{...register("ingredients.4")}
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
				</div>
				<div className={s.formGroup}>
					<label>Ingredient 6</label>
					<input
						className={s.formInput}
						{...register("ingredients.5")}
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
				</div>
			</div>
			<button type='submit' className={cx(s.btn, s.uploadBtn)}>
				<FaFileUpload />
				<span>Upload</span>
			</button>
		</form>
	);
};

export { RecipeForm };
