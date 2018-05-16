import Button from '../Button'
import React from 'react'
import style from './style'

const CreateTranslationPage = ({}) => (
	<div>
		<input className={style.input} type="name" placeholder="Name" />
		<textarea
			className={style.input}
			name="snippet"
			id=""
			cols="30"
			rows="10"
			placeholder="Snippet"
		/>
		<Button>Create</Button>
	</div>
)

export default CreateTranslationPage
