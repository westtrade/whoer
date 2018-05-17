import * as actions from './actionTypes'
import * as api from '../../api'

const { credentials } = api

export const updateTranslationsByEvent = (eventTranslation = {}) => {
	let action = 'create'
	eventTranslation = JSON.parse(eventTranslation)
	if (eventTranslation.created !== eventTranslation.updated) {
		action = 'update'
	}

	if (eventTranslation.deleted) {
		action = 'delete'
	}

	return async (dispatch, getState) => {
		if (action === 'delete') {
			dispatch({
				type: actions.UPDATE_TRANSLATIONS_BY_EVENT,
				payload: {
					translation: eventTranslation,
					action,
				},
			})
		}

		const { activeLanguage } = getState()

		const { data: translation } = await api.translation(
			eventTranslation.id,
			activeLanguage,
			credentials,
		)
		dispatch({
			type: actions.UPDATE_TRANSLATIONS_BY_EVENT,
			payload: {
				translation,
				action,
			},
		})
	}
}

export const createTranslation = (translation = {}) => {
	return async (dispatch, getState) => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		const { activeLanguage } = getState()
		const { name, snippet } = translation
		let createdTranslation

		try {
			const { data: payload } = await api.createTranslation(
				name,
				snippet,
				activeLanguage,
				credentials,
			)

			createdTranslation = payload

			dispatch({
				type: actions.CREATE_TRANSLATION,
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

export const updateTranslation = (id, translation = {}) => {
	return async (dispatch, getState) => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		const { activeLanguage } = getState()
		const { name, snippet } = translation

		try {
			const { data: payload } = await api.updateTranslation(
				id,
				snippet,
				activeLanguage,
				credentials,
			)

			dispatch({
				type: actions.UPDATE_TRANSLATION,
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

export const deleteTranslation = id => {
	return async (dispatch, getState) => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		const { activeLanguage } = getState()

		try {
			const { data: payload } = await api.deleteTranslation(
				id,
				credentials,
			)

			dispatch({
				type: actions.DELETE_TRANSLATION,
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
	return (dispatch, getState) => {
		const { translation } = getState()
		dispatch({
			type: actions.SET_ACTIVE_LANGUAGE,
			payload: language,
		})

		dispatch(fetchTranslations(language))
		dispatch(fetchLexicon(language))
		if (translation && translation.id) {
			dispatch(fetchTranslation(translation.id, language))
		}
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

export const fetchTranslation = (id, language = '') => {
	return async dispatch => {
		dispatch({
			type: actions.LOADING,
			payload: true,
		})

		try {
			const { data: payload } = await api.translation(
				id,
				language,
				credentials,
			)

			dispatch({
				type: actions.FETCH_TRANSLATION,
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
