import React, { FC } from 'react';
import './Login.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../Models/user.model';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';



const Login = () => {

  const _navigate = useNavigate()
  const dispatch = useDispatch()
  const userName = useRef<any>('')
  const password = useRef<any>('');

  const handleSubmit = () => {
    const userDetails = new User(userName.current.value, password.current.value)
    const data = JSON.stringify(userDetails)
    localStorage.setItem('User', data)
    dispatch(setUser(data))
    _navigate('/home')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="Login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group mb-3">
          <input type="text" className="form-control" id="username" placeholder="@UserName" ref={userName} required />
        </div>
        <div className="form-group mb-3">
          <input type="password" className="form-control" id="password" placeholder="Password" ref={password} required />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
      </form>
    </div>
  )

}

export default Login;
