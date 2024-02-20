import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MyRouter from "./router.jsx";
import { store } from './store'
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <MyRouter />
    </Provider>
  </React.StrictMode>,
)
