import { applyMiddleware, compose, createStore } from 'redux'

// import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'

const midsStack = [applyMiddleware(thunkMiddleware)]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	midsStack.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const middlewares = compose(...midsStack)

export default createStore(reducers, middlewares)
