import './styles/reset.css'
import './styles/styles.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import { resetStore as store } from './state/store'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
  <Provider store={store()}>
    <App />
  </Provider>
)
