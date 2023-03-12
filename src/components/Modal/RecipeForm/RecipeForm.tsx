import cx from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { FaFileUpload, FaRegThumbsUp, FaRegTimesCircle } from "react-icons/fa";

import { useAddRecipeMutation } from "services/api";

import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";
import { FormInput } from "components/Modal/RecipeForm/FormInput";

import { fieldsData, ingredientsFields } from "./fieldsData";

import type { FormRecipeType, RecipeType } from "types";

import s from "./recipeForm.module.scss";

type RecipeFormProps = {
	handleCloseModal: () => void;
};

const RecipeForm = ({ handleCloseModal }: RecipeFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormRecipeType>({
		mode: "onSubmit",
	});

	const [addRecipe, { error, isLoading, isSuccess }] = useAddRecipeMutation();

	if (isLoading) return <Spinner />;
	if (isSuccess) {
		setTimeout(() => {
			handleCloseModal();
		}, 2000);
		return <RenderMessage text='Uploading successful!' icon={<FaRegThumbsUp />} />;
	}
	if (error) {
		let errMsg = "";

		if ("status" in error) {
			errMsg = "error" in error ? error.error : JSON.stringify(error.data);
		} else {
			if (error.message) {
				errMsg = error.message;
			}
		}
		return (
			<RenderMessage text={`Something goes wrong! ${errMsg}. Please, try again!`} icon={<FaRegTimesCircle />} />
		);
	}

	const handleAddRecipe = async (body: RecipeType) => {
		await addRecipe(body).unwrap();
	};

	const onSubmit: SubmitHandler<FormRecipeType> = (formData) => {
		const { ingredients, servings } = formData;

		const newIngredients = ingredients
			.filter((ingredient) => ingredient !== "")
			.map((ingredient) => {
				const [quantity, unit, description] = ingredient.split(",").map((el) => el.trim());
				return { quantity: quantity ? Number(quantity) : null, unit, description };
			});

		const recipe = {
			...formData,
			ingredients: newIngredients,
			servings: Number(servings),
		};

		handleAddRecipe(recipe);
		reset();
	};

	return (
		<form className={s.root} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.box}>
				<h3 className={s.header}>Recipe data</h3>

				{fieldsData.map((field) => (
					<FormInput data={field} key={field.fieldname} register={register} errors={errors} />
				))}

				<input type='hidden' {...register("id")} value={uuidv4()} />
			</div>

			<div className={s.box}>
				<h3 className={s.header}>Ingredients</h3>
				{ingredientsFields.map((field, idx) => (
					<FormInput data={field} key={field.label} register={register} errors={errors} idx={idx} />
				))}
			</div>
			<button type='submit' className={cx(s.btn, s.uploadBtn)}>
				<FaFileUpload />
				<span>Upload</span>
			</button>
		</form>
	);
};

export { RecipeForm };
