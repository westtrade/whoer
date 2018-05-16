import React from 'react'
import style from './style'

const Button = ({ className = '', children, onClick }) => (
	<div className={`${className} ${style.button}`} onClick={onClick}>
		{children}
	</div>
)

export default Button
