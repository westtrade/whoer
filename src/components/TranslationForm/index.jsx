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
import validate from 'validate.js'
import { withRouter } from 'react-router-dom'

const createFormConstraints = {
	name: {
		presence: true,
		format: {
			pattern: /^[a-z]+$/,
			message: (value, attribute) =>
				'field must be alphabetic and lowercase',
		},
	},

	snippet: {
		presence: true,
	},
}

const editFormConstraints = {}

const formConstraints = {
	create: createFormConstraints,
	edit: editFormConstraints,
}

class TranslationForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			translation: props.translation || {},
			errors: {},
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.validateForm = this.validateForm.bind(this)
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

	validateForm(translation) {
		const constraintsType = this.state.id ? 'edit' : 'create'
		const constraints = formConstraints[constraintsType]
		return validate(translation, constraints)
	}

	handleChange(event) {
		const { name, value } = event.target
		const { translation } = this.state
		translation[name] = value

		const errors = this.validateForm(translation)

		this.setState({
			translation,
			errors,
		})
	}

	async handleSubmit() {
		const { translation } = this.state
		const errors = this.validateForm(translation)
		this.setState({
			errors,
		})

		if (errors) {
			return
		}

		if (this.props.id) {
			await store.dispatch(updateTranslation(this.props.id, translation))
			this.props.history.push('/')
			return
		}

		await store.dispatch(createTranslation(translation))
		this.props.history.push('/')
	}

	render() {
		const { translation, errors = {} } = this.state
		const { id } = this.props

		return (
			<div>
				<Link to="/">
					<Button className={style.backButton}>&laquo; Back</Button>
				</Link>
				{!id && (
					<div className={style.wrapper}>
						<input
							className={style.input}
							placeholder="Name *"
							name="name"
							value={translation.name || ''}
							onChange={this.handleChange}
						/>
						{errors.name && (
							<div className={style.error}>
								{errors.name.join(', ')}
							</div>
						)}
					</div>
				)}
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
					{errors.snippet && (
						<div className={style.error}>
							{errors.name.join(', ')}
						</div>
					)}
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
		history: props.history,
	}))(TranslationForm),
)
