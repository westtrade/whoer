import * as actions from '../../store/actions'

import React, { Fragment } from 'react'

import DateField from '../DateField'
import HeaderCell from '../HeaderCell'
import { connect } from 'react-redux'
import style from './style'

const DataTable = ({
	data = [],
	setSortable = field => {
		console.log(field)
	},
}) => {
	return (
		<div className={style.table}>
			<HeaderCell cell="id" setSortable={setSortable}>
				id
			</HeaderCell>
			<HeaderCell cell="name" setSortable={setSortable}>
				name
			</HeaderCell>
			<HeaderCell cell="snippet" setSortable={setSortable}>
				snippet
			</HeaderCell>
			<HeaderCell cell="created" setSortable={setSortable}>
				created
			</HeaderCell>
			<HeaderCell cell="updated" setSortable={setSortable}>
				updated
			</HeaderCell>
			<HeaderCell>operations</HeaderCell>
			{data.map((item, idx) => {
				return (
					<Fragment key={item.id}>
						<div className={style.cell}>{item.id}</div>
						<div className={style.cell}>{item.name}</div>
						<div className={style.cell}>{item.snippet}</div>
						<DateField className={style.cell} date={item.created} />
						<DateField className={style.cell} date={item.updated} />
						<div className={style.cell}>delete edit</div>
					</Fragment>
				)
			})}
		</div>
	)
}

export default connect(state => ({
	data: state.translations,
}))(DataTable)
