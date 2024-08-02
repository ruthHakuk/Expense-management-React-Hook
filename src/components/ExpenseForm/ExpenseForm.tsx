import React, { FC, useEffect, useState } from 'react'
import './ExpenseForm.scss'
import { useFormik } from 'formik'
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { addExpense, getExpenseById, updateExpenseById } from '../../redux/slices/expenseSlice'
import { Expense } from '../../Models/expense.model'
import { useNavigate, useParams } from 'react-router-dom'
import { setMessage } from '../../redux/slices/messageSlice'
import { Message } from '../../Models/message.model'
import { IRootState } from '../..'


const AddExpenseForm: FC = () => {
  const _navigate = useNavigate()
  const dispatch = useDispatch()
  const [isClicked, setClicked] = useState<boolean>(false)
  const expenseToUpdate:Expense = useSelector((state: any) => state.expencesList.expenseById)
  const [category, setCategory] = useState<string[]>(["Food", "Housing", "Transportation", "Utilities", "Healthcare", "Insurance", "Debt Payments", "Savings and Investments", "Entertainment and Recreation", "Personal Care", "Children and Pets", "Gifts and Donations", "Education", "Miscellaneous", "Taxes"])
  const [currency, setCurrency] = useState<string[]>(["ILS", "USD"])
  const [paymentMethod, setPaymentMethod] = useState<string[]>(["Cash", "Credit Card", "Debit Card", "Bank Transfer", "PayPal", "Direct Deposit", "Gift Card"])
  const [expense, setExpense] = useState<Expense | null>(expenseToUpdate)

  const prams = useParams()
  if (prams.isUpdate && prams.expenseId) {
    dispatch(getExpenseById(prams.expenseId))
  }

  useEffect(() => {
    if (prams.isUpdate == 'true' && expenseToUpdate != null) {
      setCategory(prevCategories => [expenseToUpdate.category, ...prevCategories.filter(item => item !== expenseToUpdate.category)])
      setCurrency(prevCurrency => [expenseToUpdate.currency, ...prevCurrency.filter(item => item !== expenseToUpdate.currency)])
      setPaymentMethod(prevPaymentMethod => [expenseToUpdate.paymentMethod, ...prevPaymentMethod.filter(item => item !== expenseToUpdate.paymentMethod)])
    }
  }, [prams.isUpdate, expenseToUpdate])

  const initialValues = prams.isUpdate == 'true' && expense ? {
    description: expense.description,
    amount: expense.amount,
    category: expense.category,
    paymentMethod: expense.paymentMethod,
    notes: expense.notes,
    receiptAttachment: expense.receiptAttachment,
    date: expense.date.toString(),
    currency: expense.currency,
    location: expense.location,
  } : {
    description: '',
    amount: 0,
    category: 'work',
    paymentMethod: 'CREDIT',
    notes: '',
    receiptAttachment: '',
    date: new Date(),
    currency: 'ILS',
    location: '',
  }

  const validationSchema = yup.object().shape({
    description: yup.string().required(' required'),
    amount: yup.number().required(' required').min(0, 'Amount must be a positive number'),
    category: yup.string().required(' required'),
    paymentMethod: yup.string().required(' required'),
    notes: yup.string(),
    receiptAttachment: yup.string(),
    date: yup.date().required('required'),
    currency: yup.string().required(' required'),
    location: yup.string().required('required'),
    status: yup.string(),
  })

  const onSubmit = (values: any) => {
    if (prams.isUpdate == 'true' && expense) {
      const updatedExpense = { ...expense, ...values, date: new Date(values.date) }
      dispatch(setMessage(new Message("Success", "Expense updated successfully")))
      dispatch(updateExpenseById(updatedExpense))
    } else {
      const newExpense = new Expense(
        values.description,
        values.amount,
        values.category,
        values.paymentMethod,
        values.notes,
        values.receiptAttachment,
        new Date(),
        values.currency,
        values.location,
      )
      dispatch(setMessage(new Message("Success", "New expense added successfully")))
      dispatch(addExpense(newExpense))
    }
    setClicked(true)
  }

  const myForm = useFormik({ initialValues, onSubmit, validationSchema })
  const goToMainPage = () => {
    _navigate(`/home`)
  }
  const backToDetailesPage = () => {
    _navigate(`/home/expensDetailes/${expenseToUpdate.expenseId}`)
  }

  return (
    <div>
      <div className="float-right" dir="rtl">
        <button className="btn btn-secondary btn-rtl" onClick={prams.isUpdate == 'false' ? goToMainPage : backToDetailesPage}>
          <i className="fas fa-arrow-right"></i> Back
        </button>
      </div>
      <div className='ExpenseForm'>

        <div className="AddExpenseForm">
          <div dir="rtl">
          </div>
          {prams.isUpdate == 'true' ? <h1>Update Expense Form</h1> : <h1>New Expense Form</h1>}
          <form onSubmit={myForm.handleSubmit} className="row">
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label className="mb-2">Description</label>
                <input
                  name="description"
                  value={myForm.values.description}
                  onChange={myForm.handleChange}
                  className="form-control"
                  onBlur={myForm.handleBlur}
                />
                {myForm.touched.description && myForm.errors.description ? <small className="errors text-danger">{myForm.errors.description}</small> : ''}
              </div>
              <div className="form-group mt-3">
                <label className="mb-2">Amount</label>
                <input
                  name="amount"
                  type="number"
                  value={myForm.values.amount}
                  onChange={myForm.handleChange}
                  className="form-control"
                  onBlur={myForm.handleBlur}

                />
                {myForm.errors.amount && myForm.touched.amount ? <small className="errors text-danger">{myForm.errors.amount}</small> : ''}
              </div>
              <div className="form-group mt-3">
                <label className="mb-2">Category</label>
                <select
                  className="form-control"
                  onBlur={myForm.handleBlur}

                  name="category"
                  onChange={(e) => (myForm.values.category = e.target.value)}
                >
                  {category.map((cat, index) =>
                    <option key={index} value={cat}>{cat}</option>
                  )}
                </select>
                {myForm.errors.category && myForm.touched.category ? <small className="errors text-danger">{myForm.errors.category}</small> : ''}
              </div >
              <div className="form-group mt-3">
                <label className="mb-2">Payment Method</label>
                <select
                  className="form-control"
                  onBlur={myForm.handleBlur}

                  name="paymentMethod"
                  onChange={(e) => (myForm.values.paymentMethod = e.target.value)}
                >
                  {paymentMethod.map((method, index) =>
                    <option key={index} value={method}>{method}</option>
                  )}
                </select>
                {myForm.errors.paymentMethod && myForm.touched.paymentMethod ? <small className="errors text-danger">{myForm.errors.paymentMethod}</small> : ''}
              </div>
              <div className="form-group mt-3">
              </div>
            </div>
            <div className="col-md-6">

              <div className="form-group mt-3">
                <label className="mb-2">Currency</label>
                <select
                  className="form-control"
                  onBlur={myForm.handleBlur}

                  name="currency"
                  onChange={(e) => (myForm.values.currency = e.target.value)}
                >
                  {currency.map((curr, index) =>
                    <option key={index} value={curr}>{curr}</option>
                  )}
                </select>
                {myForm.errors.currency && myForm.touched.currency ? <small className='errors text-danger'>{myForm.errors.currency}</small> : ''}
              </div>
              <div className="form-group mt-3">
                <label className="mb-2">Location</label>
                <input
                  name="location"
                  onBlur={myForm.handleBlur}

                  value={myForm.values.location}
                  onChange={myForm.handleChange}
                  className="form-control"
                />
                {myForm.errors.location && myForm.touched.location ? <small className="errors text-danger">{myForm.errors.location}</small> : ''}
              </div>
              <div className="form-group mt-3">
                <label className="mb-2">Receipt Attachment</label>
                <input
                  name="receiptAttachment"
                  value={myForm.values.receiptAttachment}
                  onChange={myForm.handleChange}
                  className="form-control"
                  onBlur={myForm.handleBlur}

                />

                {myForm.errors.receiptAttachment && myForm.touched.receiptAttachment ? <small className="errors text-danger">{myForm.errors.receiptAttachment}</small> : ''}
              </div>
              <div className="form-group mt-3">
                <label className="mb-2">Notes</label>
                <input
                  name="notes"
                  value={myForm.values.notes}
                  onChange={myForm.handleChange}
                  className="form-control"
                  onBlur={myForm.handleBlur}

                />
                {myForm.errors.notes && myForm.touched.notes ? <small className="errors text-danger">{myForm.errors.notes}</small> : ''}
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-end col-12">
              <button disabled={isClicked} type="submit" className="btn btn-primary">Save</button>
              <button disabled={isClicked} onClick={prams.isUpdate == 'true' ? backToDetailesPage : goToMainPage} className="btn btn-secondary ms-2">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExpenseForm

