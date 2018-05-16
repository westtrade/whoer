import './common'

import * as api from './api'

import React, { Fragment } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { fetchLanguages, setActiveLanguage } from './store/actions'

import Button from './components/Button'
import DataTable from './components/DataTable'
import FrontPage from './components/FrontPage'
import Layout from './components/Layout'
import LexiconPage from './components/LexiconPage'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import TranslationForm from './components/TranslationForm'
import store from './store'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Route path="/lexicon" component={LexiconPage} />
					<Route
						path="/translation/create"
						exact={true}
						component={TranslationForm}
					/>
					<Route
						path="/translation/edit/:id"
						component={TranslationForm}
					/>
					<Route
						path="/translation/view/:id"
						component={TranslationForm}
					/>
					<Route path="/" exact={true} component={FrontPage} />
				</Layout>
			</Router>
		</Provider>
	)
}
;(async () => {
	store.dispatch(fetchLanguages())
	store.dispatch(setActiveLanguage('en'))
	ReactDOM.render(<App />, document.getElementById('app'))
})()
