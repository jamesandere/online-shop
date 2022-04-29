import React from 'react'
import { StyledForm } from '../components/StyledForm'

const Login = () => {
  return (
    <StyledForm>
        <h2>Login</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Login</button>
    </StyledForm>
  )
}

export default Login