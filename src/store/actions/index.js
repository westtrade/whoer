import * as actions from './actionTypes'
import * as api from '../../api'

process.env
const { WHOER_USERNAME: username, WHOER_PASSWORD: password } = process.env
const credentials = { username, password }

export const fetchLanguages = () => {
	return async dispatch => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		try {
			const { data: payload } = await api.languages()
			dispatch({
				type: actions.FETCH_LANGUAGES,
				payload,
			})
		} catch (e) {
			dispatch({
				type: actions.ERROR,
				payload: e,
			})
		}

		dispatch({
			type: actions.LOADING,
			payload: false,
		})
	}
}

export const setActiveLanguage = (language = 'ru') => {
	return dispatch => {
		dispatch({
			type: actions.SET_ACTIVE_LANGUAGE,
			payload: language,
		})

		dispatch(fetchTranslations(language))
		dispatch(fetchLexicon(language))
	}
}

export const fetchTranslations = (language = 'en') => {
	return async dispatch => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		try {
			const { data: payload } = await api.translations(
				language,
				credentials,
			)
			dispatch({
				type: actions.FETCH_TRANSLATIONS,
				payload,
			})
		} catch (e) {
			dispatch({
				type: actions.ERROR,
				payload: e,
			})
		}

		dispatch({
			type: actions.LOADING,
			payload: false,
		})
	}
}

export const fetchLexicon = (language = 'en') => {
	return async dispatch => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		try {
			const { data: payload } = await api.lexicon(language)
			dispatch({
				type: actions.FETCH_LEXICON,
				payload,
			})
		} catch (e) {
			dispatch({
				type: actions.ERROR,
				payload: e,
			})
		}

		dispatch({
			type: actions.LOADING,
			payload: false,
		})
	}
}

export const initializeData = (language = 'en') => {
	return async dispatch => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		dispatch({
			type: actions.SET_ACTIVE_LANGUAGE,
			payload: language,
		})

		try {
			const { data: payload } = await api.languages()
			dispatch({
				type: actions.FETCH_LANGUAGES,
				payload,
			})
		} catch (e) {
			dispatch({
				type: actions.ERROR,
				payload: e,
			})
		}

		try {
			const { data: payload } = await api.translations(
				language,
				credentials,
			)
			dispatch({
				type: actions.FETCH_TRANSLATIONS,
				payload,
			})
		} catch (e) {
			dispatch({
				type: actions.ERROR,
				payload: e,
			})
		}

		dispatch({
			type: actions.LOADING,
			payload: false,
		})
	}
}

export const setPageTitle = (pageTitle = '') => {
	return {
		type: actions.SET_PAGE_TITLE,
		payload: pageTitle,
	}
}

export const setPageSubTitle = (pageSubTitle = '') => {
	return {
		type: actions.SET_PAGE_SUBTITLE,
		payload: pageSubTitle,
	}
}
