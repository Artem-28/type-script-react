import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AppActions } from '../actions/actionTypes'
import loadingReduser from './loadingReduser'
import ListDevisionsReduser from './listDevisionsReduser'


export const rootReducer = combineReducers({
    loading: loadingReduser,
    listDevisions: ListDevisionsReduser
})

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  ))
export type AppState = ReturnType<typeof rootReducer>