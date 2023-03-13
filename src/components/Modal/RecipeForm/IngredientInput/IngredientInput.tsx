import type { FormRecipeType, RecipeType } from "types";
import type { FieldDataType, IngredientsFieldDataType } from "components/Modal/RecipeForm/fieldsData";
import type { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

import s from "./formInput.module.scss";

type FormInputProps = {
	data: FieldDataType | IngredientsFieldDataType;
	register: UseFormRegister<FormRecipeType | RecipeType>;
	errors: Partial<FieldErrorsImpl<FormRecipeType>>;
	isIngredient?: boolean;
	idx?: number;
};

const IngredientInput = ({ data, register, errors, idx = 0, isIngredient }: FormInputProps) => {
	const isTypeIngredients = (
		object: FieldDataType | IngredientsFieldDataType
	): object is IngredientsFieldDataType => {
		return "validationName" in object;
	};

	return isIngredient && isTypeIngredients(data) ? (
		<div className={s.group}>
			<label className={s.label}>{data.label}</label>
			<input
				className={s.input}
				placeholder={data.placeholder}
				{...register(data.validationName, data.validationProp)}
			/>
			{errors && data.errors[fieldname][idx] && <p className={s.error}>{data.error}</p>}
		</div>
	) : (
		<div className={s.group}>
			<label className={s.label}>{data.label}</label>
			<input
				className={s.input}
				placeholder={data.placeholder}
				{...register(data.fieldname, data.validationProp)}
			/>
			{errors && data.errors[fieldname] && <p className={s.error}>{data.error}</p>}
		</div>
	);
};

export { FormInput };
