import React, { Fragment } from 'react'

import Button from '../Button'
import DataTable from '../DataTable'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPageTitle } from '../../store/actions'
import store from '../../store'

export default class FrontPage extends React.Component {
	componentDidMount() {
		store.dispatch(setPageTitle('Translations'))
	}

	render() {
		return (
			<Fragment>
				<Link to="/translation/create">
					<Button>Create translation</Button>
				</Link>
				<DataTable />
			</Fragment>
		)
	}
}
