import ResultsPreview from "../ResultsPreview";

import styles from "./results.module.scss";

const Results = () => {
    return (
        <ul className={styles.results}>
            <ResultsPreview />
        </ul>
    );
};

export default Results;
