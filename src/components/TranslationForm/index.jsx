import Button from '../Button'
import { Link } from 'react-router-dom'
import React from 'react'
import { setPageSubTitle } from '../../store/actions'
import store from '../../store'
import style from './style'

class TranslationForm extends React.Component {
	componentWillMount() {
		const pageSubTitle = this.props.id ? `edit ${this.props.id}` : 'create'
		store.dispatch(setPageSubTitle(pageSubTitle))
	}

	render() {
		return (
			<div>
				<Link to="/">
					<Button className={style.backButton}>&laquo; Back</Button>
				</Link>
				<div className={style.wrapper}>
					<input
						className={style.input}
						type="name"
						placeholder="Name *"
					/>
				</div>
				<div className={style.wrapper}>
					<textarea
						className={style.input}
						name="snippet"
						id=""
						cols="30"
						rows="4"
						placeholder="Snippet *"
					/>
				</div>
				<Button>Create</Button>
			</div>
		)
	}
}

export default TranslationForm
