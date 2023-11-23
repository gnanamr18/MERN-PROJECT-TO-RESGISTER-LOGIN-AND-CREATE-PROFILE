// import { applyMiddleware} from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
// import {composeWithDevTools}  from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'

// const initialState = {}
// const middleware = [thunk]

// const store = configureStore({
//   reducer:{rootReducer
    
//   },
//   initialState,
//   devTools: composeWithDevTools(applyMiddleware(...middleware))
  
// });

// export default store


import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './features/todo/reducerslice'

const store = configureStore({
   reducer: alertReducer
})

export default store