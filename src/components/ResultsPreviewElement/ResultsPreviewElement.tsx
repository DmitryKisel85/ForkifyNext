import classNames from "classnames";

import type { PreviewMeal } from "../../types/generalTypes";

import styles from "./resultsPreviewElement.module.scss";

type ResultsPreviewElementProps = {
    meal: PreviewMeal;
    onClick?: () => void;
    activeElement?: string | null;
};

const ResultsPreviewElement = ({ meal, onClick, activeElement }: ResultsPreviewElementProps) => {
    return (
        <li key={meal.id} className={styles.preview} onClick={onClick}>
            <div className={classNames(styles.previewLink, activeElement === meal.id && styles.previewLinkActive)}>
                <figure className={styles.previewFig}>
                    <img src={meal.image_url} alt={meal.title} />
                </figure>
                <div className={styles.previewData}>
                    <h4 className={styles.previewTitle}>{meal.title}</h4>
                    <p className={styles.previewPublisher}>{meal.publisher}</p>
                </div>
            </div>
        </li>
    );
};

export default ResultsPreviewElement;
