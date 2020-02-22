const importAll = (r) => { return r.keys().map(r) }
importAll(require.context('./assets/images', false, /\.(png|jpe?g)$/));
importAll(require.context('./assets/images/icons', false, /\.(png|ico|jpe?g)$/));
require('file-loader?name=[name].[ext]!./index.html');
import 'Assets/styles/styles.scss';


import React from "react"
import ReactDOM from 'react-dom'
import { Router, Redirect } from "@reach/router"

import IndexPage from 'Pages/IndexPage.jsx'


const App = (
  <Router>
    <IndexPage path="/" />
  </Router>
)

ReactDOM.render(App, document.getElementById('color-app')
)
