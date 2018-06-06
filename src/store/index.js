import { applyMiddleware, compose, createStore } from 'redux'

// import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'

const middlewares = compose(
	applyMiddleware(thunkMiddleware),
	// window.__REDUX_DEVTOOLS_EXTENSION__ &&
	// 	window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default createStore(reducers, middlewares)
