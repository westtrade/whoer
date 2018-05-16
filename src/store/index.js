import { applyMiddleware, compose, createStore } from 'redux'

import reducers from './reducers'
import thunk from 'redux-thunk'

const middlewares = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const store = createStore(reducers, middlewares)

export default store
