import axios from 'axios'

const WHOER_API = 'http://new.whoer.net'

export const languages = async () => {}

export const lexicon = async (language = 'ru') => {}

export const createTranslation = async (name, snippet, credentials = {}) => {}

export const translation = async id => {}

export const updateTranslation = async (
	id,
	snippet,
	language = 'ru',
	credentials = {},
) => {}

export const deleteTranslation = async (id, credentials = {}) => {}

export const translations = async () => {}

export const stream = () => {}
