import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
const Login = ({ showAlert }) => {
    const [user, setUser] = useState({

        email: "",
        password: "",
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password }),
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            navigate("/")
            showAlert("Loged in sucessfully", "success")
        }
        else {
            showAlert("Invalid details", "danger")
        }
    }
    return (
        <div className='container'><form onSubmit={
            handleSubmit
        }>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input value={user.email} onChange={onChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={user.password} onChange={onChange} type="password" className="form-control" id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form></div>
    )
}

export default Login