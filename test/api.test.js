import * as api from '../src/api'

import dotenv from 'dotenv-extended'

dotenv.load()

const credentials = {
	username: process.env.WHOER_USERNAME,
	password: process.env.WHOER_PASSWORD,
}

const WHOER_EVENT_TEST_DATA = `event:translations
data:{"id":1,"name":"test","created":1522884146,"updated":1522884146}`

test('streamDataReducer', () => {
	const [row] = WHOER_EVENT_TEST_DATA.split('\n')
	expect(api.streamDataReducer({}, row)).toEqual({
		event: 'translations',
	})
})

test('streamParser', () => {
	const streamBuffer = Buffer.from(WHOER_EVENT_TEST_DATA)
	expect(api.streamParser(streamBuffer)).toEqual({
		event: 'translations',
		data: { id: 1, name: 'test', created: 1522884146, updated: 1522884146 },
	})
})

test('languages', async () => {
	const { data } = await api.languages()
	expect(Array.isArray(data)).toBe(true)
})

test('lexicon', async () => {
	const { data } = await api.lexicon()
	expect(typeof data).toBe('object')
})

test('lexicon', async () => {
	const { data } = await api.lexicon()
	expect(typeof data).toBe('object')
})

describe('translation', () => {
	let translation
	it('should success create translation', async () => {
		const { data } = await api.createTranslation(
			'hello',
			'Привет WHOER!',
			'ru',
			credentials,
		)
		translation = data
		expect(typeof data).toBe('object')
	})

	it('should succcess get translation', async () => {
		const { data } = await api.translation(
			translation.id,
			'ru',
			credentials,
		)
		expect(data).toEqual(translation)
	})

	it('should success update translation', async () => {
		const snippet = 'test snippet'
		const { data } = await api.updateTranslation(
			translation.id,
			snippet,
			'ru',
			credentials,
		)
		expect(data.snippet).toEqual(snippet)
	})

	it('should success remove translation', async () => {
		const { data } = await api.deleteTranslation(
			translation.id,
			credentials,
		)
		expect(data.id).toEqual(translation.id)
	})
})

test('translations', async () => {
	const { data } = await api.translations('ru', credentials)
	expect(Array.isArray(data)).toBe(true)
})

test(
	'stream',
	async done => {
		const { data: stream } = await api.stream(credentials)
		const { data } = await api.createTranslation(
			'hello',
			'Привет WHOER!',
			'ru',
			credentials,
		)

		const translation = data

		stream.on('data', data => {
			const event = api.streamParser(data)
			if (
				translation &&
				event.event === 'translations' &&
				event.data.id === translation.id
			) {
				done()
			}
		})
	},
	15000,
)
