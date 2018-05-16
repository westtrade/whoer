import React from 'react'
import { connect } from 'react-redux'
import style from './style'

const LexiconPage = ({ data = [] }) => (
	<div className={style.page}>
		{data.map((item, idx) => (
			<div className={style.item} key={idx}>
				{' '}
				1
			</div>
		))}
	</div>
)

export default connect(({ lexicon = [] }) => ({
	data: lexicon,
}))(LexiconPage)
