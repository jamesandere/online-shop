import React from 'react'
import { StyledForm } from '../components/StyledForm'

const Register = () => {
  return (
    <StyledForm>
        <h2>Register</h2>
        <input type="text" placeholder="name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Register</button>
    </StyledForm>
  )
}

export default Register