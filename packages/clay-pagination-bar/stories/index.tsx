/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import '@clayui/css/lib/css/atlas.css';
import ClayButton from '@clayui/button';
const spritemap = require('@clayui/css/lib/images/icons/icons.svg');
import ClayIcon from '@clayui/icon';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import {number} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import React from 'react';

import ClayPaginationBar, {ClayPaginationBarWithBasicItems} from '../src';

storiesOf('Components|ClayPaginationBar', module)
	.add('low-level', () => (
		<ClayPaginationBar>
			<ClayPaginationBar.DropDown
				items={[
					{
						label: '10',
						onClick: () => {},
					},
				]}
				trigger={
					<ClayButton displayType="unstyled">
						10 items per page
						<ClayIcon
							spritemap={spritemap}
							symbol="caret-double-l"
						/>
					</ClayButton>
				}
			/>

			<ClayPaginationBar.Results>
				Showing a handful of items...
			</ClayPaginationBar.Results>

			<ClayPaginationWithBasicItems
				activePage={1}
				onPageChange={() => {}}
				spritemap={spritemap}
				totalPages={10}
			/>
		</ClayPaginationBar>
	))
	.add('ClayPaginationBarWithBasicItems', () => {
		const [activePage, setActivePage] = React.useState<number>(1);
		const [delta, setDelta] = React.useState<number>(5);

		const deltas = [
			{
				href: '#1',
				label: 1,
			},
			{
				label: 2,
			},
			{
				href: '#3',
				label: 3,
			},
			{
				label: 4,
			},
		];

		return (
			<ClayPaginationBarWithBasicItems
				activeDelta={delta}
				activePage={activePage}
				deltas={deltas}
				ellipsisBuffer={number('Ellipsis Buffer: ', 3)}
				onDeltaChange={setDelta}
				onPageChange={setActivePage}
				spritemap={spritemap}
				totalItems={number('Number of items: ', 21)}
			/>
		);
	})
	.add('Without DropDown', () => {
		const [activePage, setActivePage] = React.useState<number>(3);
		const [delta, setDelta] = React.useState<number>(5);

		return (
			<ClayPaginationBarWithBasicItems
				activeDelta={delta}
				activePage={activePage}
				ellipsisBuffer={number('Ellipsis Buffer: ', 3)}
				onDeltaChange={setDelta}
				onPageChange={setActivePage}
				showDeltasDropDown={false}
				spritemap={spritemap}
				totalItems={number('Number of items: ', 21)}
			/>
		);
	});
