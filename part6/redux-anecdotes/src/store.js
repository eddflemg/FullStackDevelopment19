import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
