import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";

import styles from "./pagination.module.scss";

type PaginationProps = {
    onPageChange: (currentPage: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
};

const Pagination = (props: PaginationProps) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
    return (
        <ul className={styles.paginationContainer}>
            {/* Left navigation arrow */}
            <li
                className={classnames(styles.paginationItem, {
                    [styles.paginationItemDisabled]: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <div className={classnames(styles.arrow, styles.arrowLeft)} />
            </li>
            {paginationRange &&
                // eslint-disable-next-line array-callback-return
                paginationRange.map((pageNumber, index) => {
                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === DOTS) {
                        return (
                            <li key={index} className={styles.paginationItemDots}>
                                &#8230;
                            </li>
                        );
                    }
                    if (typeof pageNumber === "number") {
                        return (
                            <li
                                key={index}
                                className={classnames(styles.paginationItem, {
                                    [styles.paginationItemSelected]: pageNumber === currentPage,
                                })}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </li>
                        );
                    }

                    // Render our Page Pills
                })}
            {/*  Right Navigation arrow */}
            <li
                className={classnames(styles.paginationItem, {
                    [styles.paginationItemDisabled]: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <div className={classnames(styles.arrow, styles.arrowRight)} />
            </li>
        </ul>
    );
};

export default Pagination;
