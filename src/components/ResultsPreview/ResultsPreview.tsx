import cx from "classnames";

import type { PreviewMeal } from "types/generalTypes";

import s from "./resultsPreview.module.scss";

type ResultsPreviewProps = {
	meal: PreviewMeal;
	onClick?: () => void;
	activeElement?: string | null;
};

const ResultsPreview = ({ meal, onClick, activeElement }: ResultsPreviewProps) => {
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

export { ResultsPreview };
