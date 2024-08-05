import React, { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IRootState } from '../..'
import { Expense } from '../../Models/expense.model'
import './ExpensesList.scss'
import Alert from 'react-bootstrap/Alert'



const ExpensesList = () => {
  //שליפה של כל הההשתלמוית מהרידאקס שלהם
  const expenses:Expense[]= useSelector((state: any) => state.expencesList.expenses)
  const [totalExpensesPerMonth, setTotalExpensesPerMonth] = useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const _navigate = useNavigate()
  const currentDate = new Date()
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' })

  const categories = [
    "Food", "Housing", "Transportation", "Utilities", "Healthcare",
    "Insurance", "Debt Payments", "Savings and Investments",
    "Entertainment and Recreation", "Personal Care", "Children and Pets",
    "Gifts and Donations", "Education", "Miscellaneous", "Taxes"
  ]
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesCategory = selectedCategory === 'All' || selectedCategory === '' || expense.category === selectedCategory
      const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])


  useEffect(() => {
    const elementDate = new Date()
    const elementMonth = elementDate.getMonth()
    const elementYear = elementDate.getFullYear()
    let workCount = 0


    expenses.forEach((element) => {
      if (elementYear === element.date.getFullYear() && elementMonth === element.date.getMonth()) {
        workCount += element.amount
      }
    })
    setTotalExpensesPerMonth(workCount)

  }, [expenses])

  const goToDetails = (id: number) => {

    _navigate(`expensDetailes/${id}`)
  }
  const goExpenseForm = () => {
    _navigate(`expenseForm/false`)
  }

  return (
    <div className="ExpensesList">

      <div className="filter-section row">
        <div className="col-sm-3">
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
          >
            <option value="All">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-3">
          <input
            placeholder='Search'
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-sm-2">
          <button className="btn btn-primary details-btn" onClick={goExpenseForm}>new Expense</button>
        </div>
        <div className="col-sm-4">
          <Alert key={'info'} variant={'info'}>
            Total expenses in {monthName} : {totalExpensesPerMonth}₪
          </Alert>
        </div>
      </div>
      <div className="expense-list row">
        {filteredExpenses.length > 0 ? filteredExpenses.map((expense: Expense, index: number) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="receipt-wrapper">
              <div className="pin"></div>
              <div className="receipt mb-4">
                <div className="receipt-header">
                  <h4 className="receipt-title">{expense.description}</h4>
                </div>
                <div className="receipt-body">
                  <div className="receipt-row">
                    <span>Amount:</span> <span>{expense.amount}{expense.currency === 'ILS' ? ' ₪' : ' $'}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Category:</span> <span>{expense.category}</span>
                  </div>
                  {expense.receiptAttachment ? (
                    <div className="receipt-row">
                      <span>Receipt:</span> <span><a href={expense.receiptAttachment} target="_blank" rel="noopener noreferrer">View</a></span>
                    </div>
                  ) : (
                    <div className="receipt-row">
                      <span>Receipt:</span> <span>no Receipt available</span>
                    </div>
                  )}
                  <div className="receipt-row">
                    <span>Date:</span> <span>{new Date(expense.date).toDateString()}</span>
                  </div>
                </div>
                <button onClick={() => goToDetails(expense.expenseId)} className="btn btn-primary details-btn">Click for details</button>
              </div>
            </div>
          </div>
        )) : <p className="no-results">No results found</p>}
      </div>
    </div>
  )
}

export default ExpensesList
