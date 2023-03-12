import type { FormRecipeType } from "types";
import type { FieldDataType } from "components/Modal/RecipeForm/fieldsData";
import type { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

import s from "./formInput.module.scss";

type FormInputProps = {
	data: FieldDataType;
	register: UseFormRegister<FormRecipeType>;
	errors: Partial<FieldErrorsImpl<FormRecipeType>>;
	idx?: number;
};

const FormInput = ({
	data: { fieldname, label, placeholder, validationProp, error },
	register,
	errors,
	idx = 0,
}: FormInputProps) => {
	return (
		<div className={s.group}>
			<label className={s.label}>{label}</label>
			<input className={s.input} placeholder={placeholder} {...register(fieldname, validationProp)} />
			{errors && errors[fieldname] && <p className={s.error}>{error}</p>}
		</div>
	);
};

export { FormInput };
