import React, { Fragment } from 'react'

import Button from '../Button'
import DataTable from '../DataTable'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const FrontPage = ({ data = [] }) => {
	return (
		<Fragment>
			<Link to="/translation/create">
				<Button>Create translation</Button>
			</Link>
			<DataTable data={data} />
		</Fragment>
	)
}

export default connect(state => {
	return {
		data: state.translations || [],
	}
})(FrontPage)
