/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayIcon from '@clayui/icon';
import {getEllipsisItems} from '@clayui/shared';
import React from 'react';

import Pagination from './Pagination';

import type {IPaginationEllipsisProps} from './Ellipsis';

const ELLIPSIS_BUFFER = 2;

interface IProps extends React.ComponentProps<typeof Pagination> {
	/**
	 * The page that is currently active. The first page is `1`.
	 */
	activePage: number;

	/**
	 * Sets the default DropDown position of the component. The component
	 * receives the Align constant values from the `@clayui/drop-down` package.
	 */
	alignmentPosition?: IPaginationEllipsisProps['alignmentPosition'];

	/**
	 * Labels for the aria attributes
	 */
	ariaLabels?: {
		previous: string;
		next: string;
	};

	/**
	 * The number of pages to show on each side of the active page before
	 * using an ellipsis dropdown.
	 */
	ellipsisBuffer?: number;

	/**
	 * Flag to disable ellipsis button
	 */
	disableEllipsis?: boolean;

	/**
	 * The page numbers that should be disabled. For example, `[2,5,6]`.
	 */
	disabledPages?: Array<number>;

	/**
	 * Function used to create the href provided for each page link.
	 */
	hrefConstructor?: (page?: number) => string;

	/**
	 * Callback for when the active page changes. This is only used if
	 * an href is not provided.
	 */
	onPageChange?: (page?: number) => void;

	/**
	 * The total number of pages in the pagination list.
	 */
	totalPages: number;

	/**
	 * Path to spritemap from clay-css.
	 */
	spritemap?: string;
}

const ClayPaginationWithBasicItems = React.forwardRef<HTMLUListElement, IProps>(
	(
		{
			activePage,
			alignmentPosition,
			ariaLabels = {
				next: 'Next',
				previous: 'Previous',
			},
			disableEllipsis = false,
			disabledPages = [],
			ellipsisBuffer = ELLIPSIS_BUFFER,
			hrefConstructor,
			onPageChange,
			spritemap,
			totalPages,
			...otherProps
		}: IProps,
		ref
	) => {
		const previousPage = activePage - 1;
		const previousHref = hrefConstructor && hrefConstructor(previousPage);

		const nextPage = activePage + 1;
		const nextHref = hrefConstructor && hrefConstructor(nextPage);

		const pages = Array(totalPages)
			.fill(0)
			.map((item, index) => index + 1);

		return (
			<Pagination {...otherProps} ref={ref}>
				<Pagination.Item
					aria-label={ariaLabels.previous}
					data-testid="prevArrow"
					disabled={activePage === 1}
					href={previousHref}
					onClick={() => onPageChange && onPageChange(previousPage)}
				>
					<ClayIcon spritemap={spritemap} symbol="angle-left" />
				</Pagination.Item>

				{(ellipsisBuffer
					? getEllipsisItems(
							{
								EllipsisComponent: Pagination.Ellipsis,
								ellipsisProps: {
									alignmentPosition,
									disabled: disableEllipsis,
									disabledPages,
									hrefConstructor,
									onPageChange,
								},
								items: pages,
							},
							ellipsisBuffer,
							activePage - 1
					  )
					: pages
				).map((page: number | JSX.Element | Object, index: number) =>
					React.isValidElement(page) ? (
						React.cloneElement(page, {key: `ellipsis${index}`})
					) : (
						<Pagination.Item
							active={page === activePage}
							disabled={disabledPages.includes(page as number)}
							href={
								hrefConstructor &&
								hrefConstructor(page as number)
							}
							key={page as number}
							onClick={() =>
								onPageChange && onPageChange(page as number)
							}
						>
							{page}
						</Pagination.Item>
					)
				)}

				<Pagination.Item
					aria-label={ariaLabels.next}
					data-testid="nextArrow"
					disabled={activePage === totalPages}
					href={nextHref}
					onClick={() => onPageChange && onPageChange(nextPage)}
				>
					<ClayIcon spritemap={spritemap} symbol="angle-right" />
				</Pagination.Item>
			</Pagination>
		);
	}
);

ClayPaginationWithBasicItems.displayName = 'ClayPaginationWithBasicItems';

export {ClayPaginationWithBasicItems};
