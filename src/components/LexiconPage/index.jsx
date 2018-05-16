import React, { Fragment } from 'react'
import { fetchLexicon, setPageTitle } from '../../store/actions'

import { connect } from 'react-redux'
import store from '../../store'
import style from './style'

class LexiconPage extends React.Component {
	componentWillMount() {
		store.dispatch(fetchLexicon(this.props.activeLanguage))
		store.dispatch(setPageTitle('Lexicon'))
	}

	render() {
		const { lexicon = {} } = this.props
		return (
			<div className={style.page}>
				{Object.entries(lexicon).map(([key, value], idx) => (
					<Fragment>
						<div className={style.key} key={`${key}_${idx}`}>
							{key}
						</div>
						<div className={style.value} key={`${key}_${idx}`}>
							{value}
						</div>
					</Fragment>
				))}
			</div>
		)
	}
}

export default connect(({ lexicon = {}, activeLanguage = 'en' }) => ({
	activeLanguage,
	lexicon,
}))(LexiconPage)
