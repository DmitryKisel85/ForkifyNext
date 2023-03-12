import cx from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { FaFileUpload, FaRegThumbsUp, FaRegTimesCircle } from "react-icons/fa";

import { useAddRecipeMutation } from "services/api";

import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";

import { fieldsData } from "./fieldsData";

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

				{fieldsData.map((field) => {
					const { fieldname, label, placeholder, error, validationProp } = field;

					return (
						<div className={s.group}>
							<label className={s.label}>{label}</label>
							<input
								className={s.input}
								placeholder={placeholder}
								{...register(fieldname, validationProp)}
							/>
							{errors && errors[fieldname] && <p className={s.error}>{error}</p>}
						</div>
					);
				})}
				<input type='hidden' {...register("id")} value={uuidv4()} />
			</div>

			<div className={s.box}>
				<h3 className={s.header}>Ingredients</h3>

				{[...Array(6)].map((el, i) => {
					const inputValidationProp =
						i === 0
							? {
									...register("ingredients.0", {
										minLength: 3,
										required: true,
									}),
							  }
							: null;

					return (
						<div key={i} className={s.group}>
							<label className={s.label}>{`Ingredient ${i + 1}`}</label>
							<input
								className={s.input}
								{...inputValidationProp}
								placeholder="Format: 'Quantity,Unit,Description'"
							/>
							{i === 0 && errors?.ingredients && (
								<p className={s.error}>Please, enter at least one ingredient'</p>
							)}
						</div>
					);
				})}
			</div>
			<button type='submit' className={cx(s.btn, s.uploadBtn)}>
				<FaFileUpload />
				<span>Upload</span>
			</button>
		</form>
	);
};

export { RecipeForm };
