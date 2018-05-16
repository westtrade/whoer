import './common'

import * as api from './api'

import React, { Fragment } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Button from './components/Button'
import DataTable from './components/DataTable'
import FrontPage from './components/FrontPage'
import Layout from './components/Layout'
import LexiconPage from './components/LexiconPage'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import TranslationForm from './components/TranslationForm'
import { initializeData } from './store/actions'
import store from './store'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Switch>
						<Route path="/" exact component={FrontPage} />
						<Route path="lexicon" component={LexiconPage} />
						<Route
							path="translation/create"
							exact={true}
							component={TranslationForm}
						/>
						<Route
							path="translation/edit/:id"
							component={TranslationForm}
						/>
						<Route
							path="/translation/:id"
							component={TranslationForm}
						/>
					</Switch>
				</Layout>
			</Router>
		</Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))
store.dispatch(initializeData('en'))
