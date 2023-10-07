import React, { useState } from 'react'

import { useNavigate } from "react-router-dom"
const Signup = ({ showAlert }) => {
    const [user, setUser] = useState({
        name: "",
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
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            navigate("/")
            showAlert("Account created successfully", "success")
        }
        else {
            showAlert("Invalid credentials", "danger")
        }
    }
    return (
        <div className='container'><form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input onChange={onChange} type="text" className="form-control" id="name" name='name' />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input onChange={onChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input onChange={onChange} type="password" className="form-control" id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form></div>
    )
}

export default Signup