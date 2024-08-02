import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IRootState } from '../..';
import { Expense } from '../../Models/expense.model';
import { Message } from '../../Models/message.model';
import { getExpenseById, removeExpense} from '../../redux/slices/expenseSlice';
import { setMessage } from '../../redux/slices/messageSlice';
import ExpenseElement from '../ExpenseElement/ExpenseElement';
import './ExpenseDetailes.scss';


const ExpenseDetailes = () => {
  const _navigate = useNavigate()
  const prams: any = useParams()
  const dispatch = useDispatch();
  dispatch(getExpenseById(prams.expenseId))
  const expenses :Expense = useSelector((state: any) => state.expencesList.expenseById)
  const [expens, setExpense] = useState<Expense>(expenses)


  const deleteExpense = () => {
    dispatch(removeExpense(expens.expenseId))
    dispatch(setMessage(new Message('Success', 'Expense deleted Successfuly')))
    _navigate(`/home`)

  }

  const updateExpense = () => {
    _navigate(`/home/expenseForm/true/${prams.expenseId}`)
  }
  return (
    <ExpenseElement
      expenseDetails={expens}
      deleteExpense={deleteExpense}
      updateExpense={updateExpense}
    />
  )
}

export default ExpenseDetailes;
