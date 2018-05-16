import React from 'react'
import style from './style'

const HeaderCell = ({ cell, children, setSortable }) => {
	return (
		<div
			onClick={() => setSortable && setSortable(cell)}
			className={`${style.header} ${cell && style.sortable}`}
		>
			{children}
		</div>
	)
}

export default HeaderCell
