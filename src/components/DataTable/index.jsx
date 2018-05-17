import * as actions from '../../store/actions'

import React, { Fragment } from 'react'

import DateField from '../DateField'
import DeleteAction from '../DeleteAction'
import HeaderCell from '../HeaderCell'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style'

const DataTable = ({ data = [], sortTranslationsBy = field => {} }) => {
	return (
		<div className={style.table}>
			<HeaderCell cell="id" setSortable={sortTranslationsBy}>
				id
			</HeaderCell>
			<HeaderCell cell="name" setSortable={sortTranslationsBy}>
				name
			</HeaderCell>
			<HeaderCell cell="snippet" setSortable={sortTranslationsBy}>
				snippet
			</HeaderCell>
			<HeaderCell cell="created" setSortable={sortTranslationsBy}>
				created
			</HeaderCell>
			<HeaderCell cell="updated" setSortable={sortTranslationsBy}>
				updated
			</HeaderCell>
			<HeaderCell>operations</HeaderCell>
			{data.map((item, idx) => (
				<Fragment key={item.id}>
					<div className={style.cell}>{item.id}</div>
					<div className={style.cell}>{item.name}</div>
					<div className={style.cell}>{item.snippet}</div>
					<DateField className={style.cell} date={item.created} />
					<DateField className={style.cell} date={item.updated} />
					<div className={style.cell}>
						<Link
							className={style.action}
							to={`/translation/${item.id}`}
						>
							view
						</Link>
						<Link
							className={style.action}
							to={`/translation/edit/${item.id}`}
						>
							edit
						</Link>
						<DeleteAction className={style.action} tnid={item.id}>
							delete
						</DeleteAction>
					</div>
				</Fragment>
			))}
		</div>
	)
}

export default connect(state => {
	const { direction = -1, field = 'id' } = state.sort || {}
	const data = state.translations
		.sort((prev, next) => {
			let result = 0
			if (prev[field] > next[field]) {
				result = 1
			}

			if (prev[field] < next[field]) {
				result = -1
			}

			result = result * direction
			return result
		})
		.slice(0)

	return {
		data,
	}
}, actions)(DataTable)
