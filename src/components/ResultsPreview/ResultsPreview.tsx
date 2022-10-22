/* eslint-disable no-template-curly-in-string */

import styles from "./resultsPreview.module.scss";

const ResultsPreview = () => {
    return (
        <li className={styles.preview}>
            <a
                className="preview__link ${this._data.id === id ? 'preview__link--active' : ''}"
                href="#${this._data.id}"
            >
                <figure className={styles.previewFig}>
                    <img src="${this._data.image}" alt="${this._data.title}" />
                </figure>
                <div className={styles.previewData}>
                    <h4 className={styles.previewTitle}>Title</h4>
                    <p className={styles.previewPublisher}>Publisher</p>
                    {/* <h4 className="preview__title">${this._data.title}</h4>
                    <p className="preview__publisher">${this._data.publisher}</p> */}
                    <div className="preview__user-generated ${this._data.key ? '' : 'hidden'}">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
    );
};

export default ResultsPreview;
