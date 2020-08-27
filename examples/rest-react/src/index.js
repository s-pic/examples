import React from 'react'
import ReactDOM from 'react-dom'
import {LoginForm} from './LoginForm'
import {RandomUserInfo} from './RandomUserInfo'

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
    const {worker} = require('./mocks/browser')
    worker.start()
}

ReactDOM.render(
    <>
        <LoginForm/>
        <RandomUserInfo/>
    </>
    , document.getElementById('root'))
