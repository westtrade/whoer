import {
	createTranslation,
	fetchTranslation,
	setPageSubTitle,
	updateTranslation,
} from '../../store/actions'

import Button from '../Button'
import { Link } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import style from './style'
import { withRouter } from 'react-router-dom'

class TranslationForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			translation: props.translation || {},
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const { id, language } = this.props
		const pageSubTitle = id ? `edit ${this.props.id}` : 'create'
		if (id) {
			store.dispatch(fetchTranslation(id, language))
		}
		store.dispatch(setPageSubTitle(pageSubTitle))
	}

	componentWillReceiveProps(newProps) {
		const { id } = newProps
		if (!id) {
			return this.setState({
				translation: {},
			})
		}

		const translation = newProps.translation || {}
		this.setState({ translation })
	}

	handleChange(event) {
		const { name, value } = event.target
		const { translation } = this.state
		translation[name] = value
		this.setState({
			translation,
		})
	}

	handleSubmit() {
		const { translation } = this.state
		if (this.props.id) {
			store.dispatch(updateTranslation(translation))
			return
		}

		store.dispatch(createTranslation(translation))
	}

	render() {
		const { translation } = this.state
		const { id } = this.props

		return (
			<div>
				<Link to="/">
					<Button className={style.backButton}>&laquo; Back</Button>
				</Link>
				<div className={style.wrapper}>
					<input
						className={style.input}
						placeholder="Name *"
						name="name"
						value={translation.name || ''}
						onChange={this.handleChange}
					/>
				</div>
				<div className={style.wrapper}>
					<textarea
						className={style.input}
						id=""
						cols="30"
						rows="4"
						placeholder="Snippet *"
						name="snippet"
						value={translation.snippet || ''}
						onChange={this.handleChange}
					/>
				</div>
				<Button onClick={this.handleSubmit}>
					{!id ? 'Create' : 'Update'}
				</Button>
			</div>
		)
	}
}

export default withRouter(
	connect((state, props) => ({
		language: state.activeLanguage,
		translation: state.translation,
		id: props.match.params.id,
	}))(TranslationForm),
)
