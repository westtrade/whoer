import axios from 'axios'

/**
 * WHOER server base URL
 * @type {String}
 */
// const WHOER_API = 'http://new.whoer.net'
const WHOER_API =
	window.location.hostname === 'localhost'
		? ''
		: 'https://cors-anywhere.herokuapp.com/http://new.whoer.net'

/**
 * Get languages list
 * @return {Promise} Return array of languages
 */
export const languages = async () => axios.get(`${WHOER_API}/v2/languages`)

/**
 * Get lexicon
 * @param  {String}  [language='ru'] Lexicon language
 * @return {Promise}                 Lexicon map for language
 */
export const lexicon = async (language = 'ru') =>
	axios({
		method: 'GET',
		url: '/v2/lexicon',
		baseURL: WHOER_API,
		headers: {
			'Accept-Language': language,
		},
	})

/**
 * Create new translation
 * @param  {String}  name             Name of translation
 * @param  {String}  snippet          Translation snippet
 * @param  {String}  [language='ru']  Translation language
 * @param  {Object}  [credentials={}] User credentials
 * @return {Promise}                  Result translation (axios response)
 */
export const createTranslation = async (
	name,
	snippet,
	language = 'ru',
	credentials = {},
) =>
	axios({
		method: 'POST',
		baseURL: WHOER_API,
		url: '/v2/translation',
		headers: {
			'Accept-Language': language,
		},
		auth: credentials,
		data: JSON.stringify({
			name,
			snippet,
		}),
	})

/**
 * Get translation by ID
 * @param  {String|Number}  id        Translation id
 * @param  {String}  [language='ru']  Translation language
 * @param  {Object}  [credentials={}] User credentials
 * @return {Promise}                  Result translation (axios response)
 */
export const translation = async (id, language = 'ru', credentials = {}) =>
	axios({
		method: 'GET',
		baseURL: WHOER_API,
		url: `/v2/translation/${id}`,
		headers: {
			'Accept-Language': language,
		},
		auth: credentials,
	})

/**
 * Update exist translation
 * @param  {String|Number}  id        Translation id
 * @param  {String}  snippet          Translation snippet
 * @param  {String}  [language='ru']  Translation language
 * @param  {Object}  [credentials={}] User credentials
 * @return {Promise}                  Updated translation (axios response)
 */
export const updateTranslation = async (
	id,
	snippet,
	language = 'ru',
	credentials = {},
) =>
	axios({
		method: 'PUT',
		baseURL: WHOER_API,
		url: `/v2/translation/${id}`,
		headers: {
			'Accept-Language': language,
		},
		auth: credentials,
		data: JSON.stringify({
			snippet,
		}),
	})

/**
 * Delete exists translation by ID
 * @param  {String|Number}  id        Translation id
 * @param  {Object}  [credentials={}] User credentials
 * @return {Promise}                  Deleted translation data (axios response)
 */
export const deleteTranslation = async (id, credentials = {}) =>
	axios({
		method: 'DELETE',
		baseURL: WHOER_API,
		url: `/v2/translation/${id}`,
		auth: credentials,
	})

/**
 * Get translations list
 * @param  {String}  [language='ru'] Translations language
 * @param  {Object}  credentials     User credentials
 * @return {Promise}                 Array of translations (axios response)
 */
export const translations = async (language = 'ru', credentials = {}) =>
	axios({
		method: 'GET',
		baseURL: WHOER_API,
		headers: {
			'Accept-Language': language,
		},
		url: '/v2/translations',
		auth: credentials,
	})

/**
 * Events stream
 * @param  {Object} [credentials={}] User credentials
 * @return {Promise}                  [description]
 */
export const stream = (credentials = {}) =>
	axios({
		method: 'GET',
		baseURL: WHOER_API,
		responseType: 'stream',
		url: '/v2/stream',
		auth: credentials,
	})

/**
 * Convert row of data into object
 * @param  {Object} [result={}] result object
 * @param  {String} [row='']    Data row
 * @return {Object}             result
 */
export const streamDataReducer = (result = {}, row = '') => {
	const [, key, value] = row.split(/(^[^:]+):(.*)/)
	result[key] = value

	if (key === 'data') {
		result[key] = JSON.parse(value)
	}

	return result
}

/**
 * Parser for events data
 * @param  {Buffer|String} data Input data from WHOER events stream
 * @return {Object}      Events data { event: '', data: '' }
 */
export const streamParser = data =>
	data
		.toString('utf-8')
		.split('\n')
		.filter(_ => _.trim())
		.reduce(streamDataReducer, { event: null, data: null })
