import 'event-source-polyfill'

import { EVENTS_STREAM_URL } from './api'
import store from './store'
import { updateTranslationsByEvent } from './store/actions'

const events = new EventSource(EVENTS_STREAM_URL)

events.addEventListener('translations', event => {
	store.dispatch(updateTranslationsByEvent(event.data))
})

// events.addEventListener('open', data => {
// 	console.log('Open')
// })

events.addEventListener('error', err => {
	console.log('err', err)
})
