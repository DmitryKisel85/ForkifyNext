import cx from "classnames";

import type { PreviewRecipeType } from "types";

import s from "./previewRecipe.module.scss";

type PreviewRecipeProps = {
	meal: PreviewRecipeType;
	onClick?: () => void;
	activeElement?: string | null;
};

const PreviewRecipe = ({ meal, onClick, activeElement }: PreviewRecipeProps) => {
	return (
		<li key={meal.id} className={s.root} onClick={onClick}>
			<div className={cx(s.link, activeElement === meal.id && s.activeLink)}>
				<figure className={s.figure}>
					<img src={meal.image_url} alt={meal.title} />
				</figure>
				<div className={s.box}>
					<h4 className={s.title}>{meal.title}</h4>
					<p className={s.author}>{meal.publisher}</p>
				</div>
			</div>
		</li>
	);
};

export { PreviewRecipe };
