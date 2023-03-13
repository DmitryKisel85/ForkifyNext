import cx from "classnames";

import type { PreviewRecipeType } from "types";

import s from "./previewRecipe.module.scss";

type PreviewRecipeProps = {
	recipe: PreviewRecipeType;
	onClick?: () => void;
	isActive?: boolean;
};

const PreviewRecipe = ({ recipe: { image_url, title, publisher }, onClick, isActive }: PreviewRecipeProps) => {
	return (
		<li className={s.root} onClick={onClick}>
			<div className={cx(s.link, isActive && s.activeLink)}>
				<figure className={s.figure}>
					<img src={image_url} alt={title} />
				</figure>
				<div>
					<h4 className={s.title}>{title}</h4>
					<p className={s.text}>{publisher}</p>
				</div>
			</div>
		</li>
	);
};

export { PreviewRecipe };
