import React from 'react'
import { StyledForm } from '../components/StyledForm';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../redux/authSlice';

const Login = () => {
    const auth = useSelector((state) => state.auth);
    const [user,setUser] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth._id){
            navigate("/cart");
        }
    }, [auth._id, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser(user));
    }
  return (
    <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="email"
        onChange={(e)=> setUser({...user, email: e.target.value})} />
        <input type="password" placeholder="password" 
        onChange={(e)=> setUser({...user, password: e.target.value})}/>
        <button>
        {auth.loginStatus === "pending" ? "Loading..." : "Login"}
        </button>
        {auth.loginStatus === "rejected" ? 
        <p>{auth.loginError}</p>: null}
    </StyledForm>
  )
}

export default Login