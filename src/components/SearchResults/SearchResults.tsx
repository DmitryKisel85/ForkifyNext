import Results from "../Results";

import styles from "./searchResults.module.scss";

const SearchResults = () => {
    return (
        <div className={styles.searchResults}>
            <Results />
            <div className="pagination"></div>

            <p className={styles.copyright}>&copy; Design by Jonas Schmedtmann.</p>
        </div>
    );
};

export default SearchResults;
