import Results from "../Results";
import Pagination from "../Pagination";

import styles from "./searchResults.module.scss";

const SearchResults = () => {
    return (
        <div className={styles.searchResults}>
            <Results />
            <div className={styles.pagination}>
                <Pagination />
            </div>

            <p className={styles.copyright}>&copy; Design by Jonas Schmedtmann.</p>
        </div>
    );
};

export default SearchResults;
