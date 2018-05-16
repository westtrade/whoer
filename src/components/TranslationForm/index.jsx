import Button from '../Button'
import React from 'react'
import style from './style'

const TranslationForm = ({}) => (
	<div>
		<div className={style.wrapper}>
			<input className={style.input} type="name" placeholder="Name *" />
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

export default TranslationForm
