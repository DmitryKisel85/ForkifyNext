import classnames from "classnames";
import { usePagination, DOTS } from "hooks/usePagination";

import s from "./pagination.module.scss";

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
		<ul className={s.paginationContainer}>
			{/* Left navigation arrow */}
			<li
				className={classnames(s.paginationItem, {
					[s.paginationItemDisabled]: currentPage === 1,
				})}
				onClick={onPrevious}>
				<div className={classnames(s.arrow, s.arrowLeft)} />
			</li>
			{paginationRange &&
				// eslint-disable-next-line array-callback-return
				paginationRange.map((pageNumber, index) => {
					// If the pageItem is a DOT, render the DOTS unicode character
					if (pageNumber === DOTS) {
						return (
							<li key={index} className={s.paginationItemDots}>
								&#8230;
							</li>
						);
					}
					if (typeof pageNumber === "number") {
						return (
							<li
								key={index}
								className={classnames(s.paginationItem, {
									[s.paginationItemSelected]: pageNumber === currentPage,
								})}
								onClick={() => onPageChange(pageNumber)}>
								{pageNumber}
							</li>
						);
					}
					return null;

					// Render our Page Pills
				})}
			{/*  Right Navigation arrow */}
			<li
				className={classnames(s.paginationItem, {
					[s.paginationItemDisabled]: currentPage === lastPage,
				})}
				onClick={onNext}>
				<div className={classnames(s.arrow, s.arrowRight)} />
			</li>
		</ul>
	);
};

export { Pagination };
