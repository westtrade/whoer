import { Link } from 'react-router-dom'
import React from 'react'
import style from './style'

const Layout = ({ children, title = 'Translations' }) => {
	return (
		<div className={style.layout}>
			<div className={style.topBar}>
				<Link className={style.brand} to="/">
					WHOER Translate UI
				</Link>
			</div>
			<div className={style.header}>
				<h1 className={style.pageTitle}>{title}</h1>
			</div>
			<div className={style.content}>{children}</div>
		</div>
	)
}

export default Layout
