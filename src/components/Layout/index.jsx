import { Link, NavLink } from 'react-router-dom'

import LanguageSelector from '../LanguageSelector'
import React from 'react'
import { connect } from 'react-redux'
import style from './style'
import { withRouter } from 'react-router-dom'

const Layout = ({ children, title = '', subTitle = '' }) => {
	return (
		<div className={style.layout}>
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
		</div>
	)
}

export default withRouter(
	connect((state, props) => {
		return {
			children: props.children,
			title: state.page.title,
			subTitle: state.page.subTitle,
		}
	})(Layout),
)
