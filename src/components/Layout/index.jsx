import { Link, NavLink } from 'react-router-dom'

import LanguageSelector from '../LanguageSelector'
import React from 'react'
import { connect } from 'react-redux'
import style from './style'
import { withRouter } from 'react-router-dom'

const Layout = ({ children, title = 'Translations' }) => {
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
				<h1 className={style.pageTitle}>{title}</h1>
				<LanguageSelector className={style.languages} />
			</div>
			<div className={style.content}>{children}</div>
		</div>
	)
}

export default withRouter(
	connect((state, props) => {
		console.log('props.match', props.match)
		return {
			children: props.children,
			title: state.page.title,
		}
	})(Layout),
)
