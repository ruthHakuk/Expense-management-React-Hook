import React, { FC, useEffect } from 'react'
import './HomePage.scss'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => {

  return <div className='col-sm-12' >
    <NavBar></NavBar>
    <div className='HomePage  m-auto'>
      <Outlet></Outlet>
    </div>
  </div>
}

export default HomePage
