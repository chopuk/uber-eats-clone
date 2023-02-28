import { configureStore } from '@reduxjs/toolkit'

import allReducers from './reducers/index'

export default function createStore(initialState) {
  const store = configureStore({reducer: allReducers}, initialState)
  return store
}