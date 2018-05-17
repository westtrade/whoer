import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { fetchTranslation, setPageSubTitle } from '../../store/actions'

import Button from '../Button'
import DateField from '../DateField'
import DeleteAction from '../DeleteAction'
import { connect } from 'react-redux'
import store from '../../store'
import style from './style'

class TranslationPage extends Component {
	constructor(props) {
		super(props)
		this.returnOnDelete = this.returnOnDelete.bind(this)
	}

	returnOnDelete() {
		const { history } = this.props
		history.push('/')
	}

	async componentWillMount() {
		await store.dispatch(fetchTranslation(this.props.id))
		const { name, id } = this.props.translation
		store.dispatch(setPageSubTitle(`#${id}: ${name}`))
	}

	render() {
		const { translation } = this.props
		return (
			<div>
				<Link to="/">
					<Button className={style.backButton}>&laquo; Back</Button>
				</Link>

				<h1 className={style.title}>
					#{translation.id} {translation.name}
				</h1>
				<div className={style.properties}>
					<strong>id: </strong>
					<div>{translation.id}</div>

					<strong>snippet: </strong>
					<div>{translation.snippet}</div>

					<strong>created: </strong>
					<DateField date={translation.created} />
					<strong>updated: </strong>
					<DateField date={translation.updated} />
				</div>
				<Link to={`/translation/edit/${translation.id}`}>
					<Button className={style.operation}>Edit</Button>
				</Link>
				<DeleteAction
					tnid={translation.id}
					afterDelete={this.returnOnDelete}
					className={style.operation}
				>
					<Button>Delete</Button>
				</DeleteAction>
			</div>
		)
	}
}

export default withRouter(
	connect(({ translation }, { match }) => ({
		translation: translation || {},
		id: match.params.id,
	}))(TranslationPage),
)
