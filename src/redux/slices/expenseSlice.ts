import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Expense } from '../../Models/expense.model'
import { Message } from '../../Models/message.model'

const initialExpenses = [
  new Expense(
    "Grocery shopping",
    150.50,
    "Food",
    "Credit Card",
    "Weekly groceries",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-05-20"),
    "ILS",
    "Supermarket",
  ),
  new Expense(
    "Rent payment",
    2500.00,
    "Housing",
    "Bank Transfer",
    "Monthly rent for June",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-03-01"),
    "ILS",
    "Landlord",
  ),
  new Expense(
    "Bus pass",
    75.00,
    "Food",
    "Debit Card",
    "Monthly bus pass",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-02-15"),
    "ILS",
    "City Transport",
  ),
  new Expense(
    "Electricity bill",
    200.00,
    "Utilities",
    "PayPal",
    "June electricity bill",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-01-10"),
    "ILS",
    "Electric Company",
  ),
  new Expense(
    "Gym membership",
    100.00,
    "Food",
    "Credit Card",
    "Monthly gym membership fee",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-06-05"),
    "ILS",
    "Fitness Center",
  ),
  new Expense(
    "Car insurance",
    400.00,
    "Insurance",
    "Direct Deposit",
    "Monthly car insurance payment",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-04-03"),
    "ILS",
    "Insurance Company",
  ),
  new Expense(
    "Dinner out",
    120.00,
    "Entertainment and Recreation",
    "Cash",
    "Dinner at a restaurant",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-06-18"),
    "ILS",
    "Restaurant",
  ),
  new Expense(
    "Pet food",
    50.00,
    "Children and Pets",
    "Debit Card",
    "Monthly pet food supply",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-06-08"),
    "ILS",
    "Pet Store",
  ),
  new Expense(
    "Online course",
    200.00,
    "Education",
    "Credit Card",
    "Fee for an online course",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-05-12"),
    "ILS",
    "Online Learning Platform",
  ),
  new Expense(
    "Gift for friend",
    80.00,
    "Gifts and Donations",
    "Credit Card",
    "Birthday gift",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-01-22"),
    "ILS",
    "Gift Shop",
  ),
  new Expense(
    "Movie tickets",
    40.00,
    "Entertainment and Recreation",
    "Credit Card",
    "Movie night",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-04-14"),
    "ILS",
    "Cinema",
  ),
  new Expense(
    "Doctor visit",
    120.00,
    "Healthcare",
    "Debit Card",
    "Consultation fee",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-06-07"),
    "ILS",
    "Medical Clinic",
  ),
  new Expense(
    "Birthday present",
    60.00,
    "Gifts and Donations",
    "Credit Card",
    "Gift for a friend's birthday",
    'https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/87147748_2252816548355752_4703035841054769152_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muDuNu49PtAQ7kNvgHvRxll&_nc_ht=scontent.ftlv20-1.fna&oh=00_AYBdMG7NLbna2RovkMZw1e2ApOsVTGH6durou0rn96lMHg&oe=669FF006',
    new Date("2024-06-25"),
    "ILS",
    "Gift Shop",
  ),
]

const notFoundExpense = new Expense(
  'notFound',
  120.50,
  'notFound',
  'notFound',
  'notFound',
  'notFound',
  new Date('2023-05-15'),
  'notFound',
  'notFound',
)

const initalMessage: Message = new Message("Success", "not nothing")

const expenseSlice = createSlice({

  initialState: {
    expenses: initialExpenses,
    expenseById: notFoundExpense,
    message: initalMessage,
    totalExpensesPerMonth: 0.0,
    isLoaded: false
  },
  name: 'expenses',
  reducers: {
    setLoededStatus: (state) => {
      state.isLoaded = false
    },

    setExpenses: (state, action) => {
      state.expenses = action.payload

    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      const expense: Expense = action.payload
      state.expenses = [...state.expenses, expense]
      state.isLoaded = true

    },
    removeExpense: (state, action: PayloadAction<number>) => {
      const id: number = action.payload
      state.expenses = [...state.expenses.filter(expense => expense.expenseId !== id)]

      state.isLoaded = true
    },
    getExpenseById: (state, action: PayloadAction<any>) => {
      const foundElement = state.expenses.find(element => element.expenseId == action.payload)
      state.expenseById = foundElement ? foundElement : notFoundExpense
    },
    updateExpenseById: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(expense => expense.expenseId === action.payload.expenseId)
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...action.payload }
        state.isLoaded = true
      }
    },

    setTotalExpensesPerMonth: (state) => {

    }

  }
})

export default expenseSlice.reducer
export const { setExpenses, setLoededStatus, addExpense, removeExpense, getExpenseById, updateExpenseById, setTotalExpensesPerMonth } = expenseSlice.actions
