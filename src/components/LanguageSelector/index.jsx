import * as actions from '../../store/actions'

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import style from './style'

const LanguageSelector = ({
	languages = [],
	activeLanguage,
	setActiveLanguage = language => {},
	className = '',
}) => {
	return (
		<div className={`${style.languages} ${className}`}>
			{languages.map((language, idx) => (
				<div
					onClick={() => setActiveLanguage(language.code)}
					className={`${style.language} ${language.code ===
						activeLanguage && style.active}`}
					key={idx}
				>
					{language.name}
				</div>
			))}
		</div>
	)
}

export default connect(
	(state, props) => ({
		languages: state.languages,
		activeLanguage: state.activeLanguage,
		className: props.className,
	}),
	actions,
)(LanguageSelector)
