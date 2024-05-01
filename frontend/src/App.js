import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from '@reduxjs/toolkit'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Header from './components/Header'
import store from './app/Store'
const App = () => {
  return (
    <BrowserRouter>
    < Header/>
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/login' element ={<Login/>}></Route>
      <Route path='/registration' element ={<Registration/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App