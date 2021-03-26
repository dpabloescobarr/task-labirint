import {toServer, answer, start} from './redux/actions'
import rootReducer from './redux/rootReducer'

import {applyMiddleware, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import logger from 'redux-logger'


let store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
)

window.store = store

store.actions = {toServer, answer, start}


export default store