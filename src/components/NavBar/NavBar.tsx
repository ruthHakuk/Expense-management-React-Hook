import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { User } from '../../Models/user.model'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
const NavBar = () => {

  const defualtUser: any = localStorage.getItem('User')
  const objUser: User = JSON.parse(defualtUser)
  const userName: User = objUser
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  //פונקציות ליצירת האווטר
  function stringToColor(string: string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    return color
  }

  function stringAvatar(name: string) {
    const nameParts = name.split(' ')
    let initials = ''

    if (nameParts.length === 1) {
      const firstName = nameParts[0]
      const middleIndex = Math.floor(firstName.length / 2)
      initials = `${firstName[0]}${firstName[middleIndex]}`
    } else if (nameParts.length > 1) {
      initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials.toUpperCase(),
    }
  }
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/home/tip">Currency</Link></li>
        <li><Link to="/home/Analysis">Analysis</Link></li>
        <li>
          <Button
            onClick={handleClickOpen}
            style={{
              textDecoration: 'none',
              color: 'white',
              padding: '16px 10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            About
          </Button>
        </li>
      </ul>
      <Stack direction="row" spacing={2} style={{ marginRight: '2%' }}>
        <Avatar {...stringAvatar(userName.userName)} />
      </Stack>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <section className="about">
                <h2>About Our Expense Tracker</h2>
                <p>Welcome to our Expense Tracker, your go-to tool for managing finances effortlessly. Our platform helps you keep track of daily expenditures, offering a clear view of your spending habits to ensure smarter financial decisions.</p>
                <h3>Key Features and Benefits</h3>
                <ul>
                  <li><strong>Easy Expense Logging:</strong> Quickly record all your daily expenses, from small purchases to recurring bills, ensuring nothing is missed.</li>
                  <li><strong>Financial Insights:</strong> Gain valuable insights into your spending patterns with detailed reports and visual graphs, helping you identify areas to save.</li>
                  <li><strong>Goal Setting:</strong> Set financial goals, such as saving for a trip or paying off debt, and track your progress to stay motivated and achieve your objectives.</li>
                  <li><strong>Organized Finances:</strong> Categorize and tag your expenses for easy organization and review, making financial management straightforward.</li>
                  <li><strong>Secure and Private:</strong> Rest assured that your data is safe with our robust security measures, keeping your financial information private.</li>
                </ul>
                <p>Join us today and start your journey towards better financial management with our intuitive and secure Expense Tracker. Take control of your finances and achieve your goals with ease.</p>
              </section>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </nav>

  )
}
export default NavBar
