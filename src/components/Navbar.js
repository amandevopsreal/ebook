import React from 'react'
import { useNavigate } from "react-router-dom"
import {

    Link, useLocation
} from "react-router-dom";
const Navbar = () => {
    let location = useLocation()
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")

    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Ebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                        <Link className=" mx-1 btn btn-primary" to='/login' role="submit">Login</Link>
                        <Link className="mx-1 btn btn-primary" to='/signup' role="submit">Sign Up</Link>
                    </form> : <button onClick={handleLogout} className="mx-1 btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar