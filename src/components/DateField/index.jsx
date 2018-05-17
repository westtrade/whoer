import React from 'react'
import style from './style'

const DateField = ({ date = 0, className = '' }) => {
	const currentDate = new Date()
	currentDate.setTime(date * 1000)
	return (
		<div className={`${style.date} ${className}`}>
			{currentDate.toUTCString()}
		</div>
	)
}

export default DateField
