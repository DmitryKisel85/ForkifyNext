import classNames from "classnames";

import type { PreviewMeal } from "../../types/generalTypes";

import styles from "./resultsPreviewElement.module.scss";

type ResultsPreviewElementProps = {
    meal: PreviewMeal;
    onClick?: () => void;
    activeElement?: string | null;
};

const ResultsPreviewElement = ({
    meal,
    onClick,
    activeElement,
}: ResultsPreviewElementProps) => {
    return (
        <li key={meal.id} className={styles.preview} onClick={onClick}>
            <a
                className={classNames(
                    styles.previewLink,
                    activeElement === meal.id && styles.previewLinkActive
                )}
                href={`#${meal.id}`}
            >
                <figure className={styles.previewFig}>
                    <img src={meal.image_url} alt={meal.title} />
                </figure>
                <div className={styles.previewData}>
                    <h4 className={styles.previewTitle}>{meal.title}</h4>
                    <p className={styles.previewPublisher}>{meal.publisher}</p>
                    {/* <div className="preview__user-generated ${this._data.key ? '' : 'hidden'}">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div> */}
                </div>
            </a>
        </li>
    );
};

export default ResultsPreviewElement;
