import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledForm } from '../components/StyledForm';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const auth = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    console.log(auth);

    useEffect(() => {
        if(auth._id){
            navigate("/cart");
        }
    }, [auth._id, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(registerUser(user));
    }

  return (
    <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="name"
        onChange={(e)=> setUser({...user, name: e.target.value})} />
        <input type="email" placeholder="email" 
        onChange={(e)=> setUser({...user, email: e.target.value})} />
        <input type="password" placeholder="password" 
        onChange={(e)=> setUser({...user, password: e.target.value})}/>
        <button>
            {auth.registerStatus === "pending" ? "Loading..." : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? 
        <p>{auth.registerError}</p>: null}
    </StyledForm>
  )
}

export default Register