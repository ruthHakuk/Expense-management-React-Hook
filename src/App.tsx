import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import HomePage from './components/HomePage/HomePage'
import NotFound from './components/NotFound/NotFound'
import ExpensesList from './components/ExpensesList/ExpensesList'
import ExpenseDetailes from './components/ExpenseDetailes/ExpenseDetailes'
import ExpensTip from './components/CurrencyConverter/CurrencyConverter'
import Login from './components/Login/Login'
import AddExpenseForm from './components/ExpenseForm/ExpenseForm'
import ToastMessage from './components/ToastMessage/ToastMessage'
import ExpenseAnalysis from './components/ExpenseAnalysis/ExpenseAnalysis'

function App() {
  return (
    <>
      <div className='App' >
        <ToastMessage />
        <Routes>
          <Route path='' element={<Login></Login>}></Route>
          <Route path='home' element={<HomePage></HomePage>}>
            <Route path='' element={<ExpensesList></ExpensesList>}></Route>
            <Route path='expensDetailes/:expenseId' element={<ExpenseDetailes />}></Route>
            <Route path='expenseForm/:isUpdate/:expenseId?' element={<AddExpenseForm></AddExpenseForm>}></Route>
            <Route path='tip' element={<ExpensTip></ExpensTip>}></Route>
            <Route path='Analysis' element={<ExpenseAnalysis></ExpenseAnalysis>}></Route>
          </Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    </>
  )
}
export default App
