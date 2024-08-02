import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Expense } from '../../Models/expense.model';
import './ExpenseElement.scss';

interface ExpenseElementProps {
  expenseDetails: Expense;
  deleteExpense: () => void;
  updateExpense: () => void;
}



const ExpenseElement: FC<ExpenseElementProps> = ({ expenseDetails, deleteExpense, updateExpense }) => {

  const _navigate = useNavigate()

  const goToMainPage = () => {
    _navigate(`/home`)
  }
  return (
    <div className="ExpenseElement container">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white text-center">
          <i className="fas fa-receipt"></i> Expense Details
        </div>
        <div className="float-right" dir="rtl">
          <button className="btn btn-secondary btn-rtl" onClick={goToMainPage}>
            <i className="fas fa-arrow-right"></i> Back
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <h1>{expenseDetails.description}</h1>
            <div className="col-md-6">
              <div className="expense-info">
                <p><i className="fas fa-calendar-alt"></i> <strong>Date:</strong> {expenseDetails.date.toDateString()}</p>
                <p><i className="fas fa-dollar-sign"></i> <strong>Amount:</strong> ${expenseDetails.amount.toFixed(2)}</p>
                <p><i className="fas fa-list-alt"></i> <strong>Category:</strong> {expenseDetails.category}</p>
                <p><i className="fas fa-credit-card"></i> <strong>Payment Method:</strong> {expenseDetails.paymentMethod}</p>
                <p><i className="fas fa-store"></i> <strong>Currency:</strong> {expenseDetails.currency}</p>
                <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {expenseDetails.location}</p>
                {/* <p><i className="fas fa-info-circle"></i> <strong>Status:</strong> {expenseDetails.status}</p> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="additional-info">
                {expenseDetails.notes && <p><i className="fas fa-sticky-note"></i> <strong>Notes:</strong> {expenseDetails.notes}</p>}
                {expenseDetails.receiptAttachment && (
                  <p>
                    <i className="fas fa-file-invoice"></i> <strong>Receipt:</strong> <a href={expenseDetails.receiptAttachment} target="_blank" rel="noopener noreferrer" >View</a>
                  </p>
                )}
              </div>
              <div className="actions mt-4">
                <button className="btn btn-warning mb-2 w-100" onClick={updateExpense}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger w-100" onClick={deleteExpense}>
                  <i className="fas fa-trash-alt"></i> Delete
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseElement;
