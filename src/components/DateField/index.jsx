import React from 'react'

const DateField = ({ date = 0, className = '' }) => {
	const currentDate = new Date()
	currentDate.setTime(date * 1000)
	return <div className={className}>{currentDate.toUTCString()}</div>
}

export default DateField
