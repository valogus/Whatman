import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers/auth'


const store = configureStore({
    reducer: rootReducer
})

export default store