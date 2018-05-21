import { Link, NavLink } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import LanguageSelector from '../LanguageSelector'
import React from 'react'
import { connect } from 'react-redux'
import style from './style'
import { withRouter } from 'react-router-dom'

const Layout = ({ children, title = '', subTitle = '', loading = false }) => {
	return (
		<div className={`${style.layout} ${loading && style.blur}`}>
			{loading && <div className={style.cloack} />}
			<div className={style.topBar}>
				<Link className={style.brand} to="/">
					WHOER Translate UI
				</Link>

				<NavLink
					className={style.link}
					to="/lexicon"
					activeClassName={style.active}
				>
					Lexicon
				</NavLink>
			</div>
			<div className={style.header}>
				<div className={style.info}>
					<h1 className={style.pageTitle}>{title}</h1>
					{subTitle && (
						<h2 className={style.subTitle}> &raquo; {subTitle}</h2>
					)}
				</div>
				<LanguageSelector className={style.languages} />
			</div>
			<div className={style.content}>{children}</div>
			<Helmet>
				<title>
					{title}
					{subTitle && ` (${subTitle})`} - WHOER Translate UI
				</title>
			</Helmet>
		</div>
	)
}

export default withRouter(
	connect(({ page, loading }, { children }) => ({
		children: children,
		title: page.title,
		subTitle: page.subTitle,
		loading,
	}))(Layout),
)
