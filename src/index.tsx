import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { configureStore} from '@reduxjs/toolkit'
import exspenseSlice from './redux/slices/expenseSlice'
import '@fortawesome/fontawesome-free/css/all.min.css'
import userSlice from './redux/slices/userSlice'
import messageSlice from './redux/slices/messageSlice'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const myStore=configureStore({
  reducer: {
    expencesList: exspenseSlice,
     userDetails:userSlice,
     message:messageSlice

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, 
    }),
  
})
root.render(

<BrowserRouter>
<Provider store={myStore}>
  <App></App>
  </Provider>
</BrowserRouter>
)

export type IRootState = ReturnType<typeof myStore.getState>
// export type AppDispatch = typeof myStore.dispatch

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
