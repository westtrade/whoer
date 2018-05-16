import './common'

import * as api from './api'

import React, { Fragment } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Button from './components/Button'
import CreateTranslationPage from './components/CreateTranslationPage'
import DataTable from './components/DataTable'
import FrontPage from './components/FrontPage'
import Layout from './components/Layout'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import store from './store'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout title="Translates">
					<Route path="/" exact={true} component={FrontPage} />
					<Route
						path="/translation/create"
						component={CreateTranslationPage}
					/>
				</Layout>
			</Router>
		</Provider>
	)
}

process.env
const { WHOER_USERNAME: username, WHOER_PASSWORD: password } = process.env
;(async () => {
	const credentials = { username, password }
	const { data } = await api.translations('ru', {
		username,
		password,
	})

	// console.log('data', data)

	ReactDOM.render(<App />, document.getElementById('app'))
})()
