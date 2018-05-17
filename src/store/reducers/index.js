import * as actions from '../actions/actionTypes'

import { combineReducers } from 'redux'

export const languages = (languages = [], action = {}) => {
	const { type, payload } = action
	if (type === actions.FETCH_LANGUAGES) {
		return payload
	}

	return languages
}

export const translations = (translations = [], action = {}) => {
	const { type, payload } = action
	if (type === actions.FETCH_TRANSLATIONS) {
		return payload
	}

	if (type === actions.DELETE_TRANSLATION) {
		return translations.filter(({ id }) => id !== payload.id)
	}

	if (type === actions.UPDATE_TRANSLATIONS_BY_EVENT) {
		if (payload.action === 'create') {
			return [...translations, payload.translation]
		}

		if (payload.action === 'update') {
			return translations.map(currentTranslation => {
				if (currentTranslation.id === payload.translation.id) {
					return payload.translation
				}

				return currentTranslation
			})
		}

		if (payload.action === 'delete') {
			return translations.filter(
				({ id }) => id !== payload.translation.id,
			)
		}
	}

	return translations
}

export const activeLanguage = (language = 'en', action = {}) => {
	const { type, payload } = action
	if (type === actions.SET_ACTIVE_LANGUAGE) {
		return payload
	}

	return language
}

export const loading = (isLoading = false, action = {}) => {
	return isLoading
}

export const page = (page, action = {}) => {
	page = page || {
		title: 'Translations',
		subTitle: '',
	}

	if (action.type === actions.SET_PAGE_TITLE) {
		return {
			title: action.payload,
			subTitle: '',
		}
	}

	if (action.type === actions.SET_PAGE_SUBTITLE) {
		return { ...page, subTitle: action.payload }
	}

	return page
}

export const lexicon = (lexicon = [], action) => {
	if (action.type === actions.FETCH_LEXICON) {
		return action.payload
	}

	return lexicon
}

export const translation = (translation = null, action) => {
	if (action.type === actions.FETCH_TRANSLATION) {
		return action.payload
	}

	return translation
}

export default combineReducers({
	languages,
	translations,
	activeLanguage,
	translations,
	loading,
	page,
	lexicon,
	translation,
})
