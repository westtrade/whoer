import Button from '../Button'
import React from 'react'
import { deleteTranslation } from '../../store/actions'
import store from '../../store'
import style from './style'

const DeleteAction = ({
	className = '',
	tnid,
	children,
	afterDelete = () => {},
}) => (
	<div
		className={`${style.action} ${className}`}
		onClick={async () => {
			if (!tnid) {
				throw new Error('Translation id not defined')
			}
			await store.dispatch(deleteTranslation(tnid))
			afterDelete && afterDelete()
		}}
	>
		{children}
	</div>
)

export default DeleteAction
