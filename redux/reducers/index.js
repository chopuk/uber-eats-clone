import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from "./cartReducer"

let reducers = combineReducers({
    cartReducer: cartReducer
})

const allReducers = (state, action) => {
  return reducers(state, action)
}

export default allReducers