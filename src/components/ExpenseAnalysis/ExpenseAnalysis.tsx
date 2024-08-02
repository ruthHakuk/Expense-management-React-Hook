import React, { FC, useEffect, useState } from 'react'
import './ExpenseAnalysis.scss'
import { PieChart } from '@mui/x-charts/PieChart'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../..'
import { LineChart } from '@mui/x-charts/LineChart'
import useFetchDataStatus from '../../hooks/fetchData'
import { useNavigate } from 'react-router-dom'
import { Expense } from '../../Models/expense.model'

interface ExpenseAnalysisProps { }

const ExpenseAnalysis: FC<ExpenseAnalysisProps> = () => {
  const _navigate = useNavigate()
  const listExpense :Expense[] = useSelector((state: any) => state.expencesList.expenses)
  const [yearSumExpense, setYearSumExpense] = useState<number[]>(new Array(12).fill(0))
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({})
  const categories = [
    'Food', 'Housing', 'Transportation', 'Utilities', 'Healthcare',
    'Insurance', 'Debt Payments', 'Savings and Investments',
    'Entertainment and Recreation', 'Personal Care', 'Children and Pets',
    'Gifts and Donations', 'Education', 'Miscellaneous', 'Taxes'
  ]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


  useEffect(() => {
    if (listExpense.length > 0) {
      const currentDate = new Date()
      const newYearSumExpense = new Array(12).fill(0)
      const counts: { [key: string]: number } = {}

      categories.forEach(category => {
        counts[category] = 0
      })

      listExpense.forEach(element => {
        const elementDate = new Date(element.date)
        const elementMonth = elementDate.getMonth()
        const elementYear = elementDate.getFullYear()

        if (elementYear === currentDate.getFullYear()) {
          newYearSumExpense[elementMonth] += element.amount
        }

        if (elementYear === currentDate.getFullYear() && elementMonth === currentDate.getMonth()) {
          if (categories.includes(element.category)) {
            counts[element.category] += 1
          }
        }
      })

      setCategoryCounts(counts)
      setYearSumExpense(newYearSumExpense)
    }
  }, [listExpense])

  const total = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0)
  const data = categories.map(category => ({
    label: category,
    value: total ? (categoryCounts[category] / total) * 100 : 0
  }))


  const goToMainPage = () => {
    _navigate(`/home`)
  }

  // if (error) {
  //   return <div>Error fetching data: {error.message}</div>
  // }

  return (
    <div className='ExpenseAnalysis'>
      <div className="float-right" dir="rtl">
        <button className="btn btn-secondary btn-rtl" onClick={goToMainPage}>
          <i className="fas fa-arrow-right"></i> Back
        </button>
      </div>

      <div>
        <h2>Sum expense to {months[new Date().getMonth()]} for each category:</h2>

        <PieChart
          series={[
            {
              startAngle: -90,
              endAngle: 90,
              data,
            },
          ]}
          height={270}
        />
        <h2>Sum expense for each month to year {new Date().getFullYear()}:</h2>
        <LineChart


          xAxis={[{ data: months.map((_, index) => index + 1) }]}
          series={[
            {
              data: yearSumExpense,
              area: true,
            },
          ]}
          width={500}
          height={300}
        />
      </div>

    </div>
  )
}

export default ExpenseAnalysis

