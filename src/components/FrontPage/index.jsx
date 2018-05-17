import React, { Fragment } from 'react'
import { fetchTranslations, setPageTitle } from '../../store/actions'

import Button from '../Button'
import DataTable from '../DataTable'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../store'

class FrontPage extends React.Component {
	componentDidMount() {
		store.dispatch(setPageTitle('Translations'))
		store.dispatch(fetchTranslations(this.props.activeLanguage))
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

export default connect(({ activeLanguage }) => ({ activeLanguage }))(FrontPage)
