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
	}

	return page
}

export const lexicon = (lexicon = [], action) => {
	if (action.type === actions.FETCH_LEXICON) {
		return action.payload
	}

	return lexicon
}

export default combineReducers({
	languages,
	translations,
	activeLanguage,
	translations,
	loading,
	page,
})
