import { useState } from "react"
import "./SignInUp.css"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login, register } from "../../redux/userDetailsSlice"


const SignInUp = () => {
    const succsess = useSelector(state => state.userDetailsSlice.succsess)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [registerEmail, setRegisterEmail] = useState()
    const [registerPassword, setRegisterPassword] = useState()
    const [fullName, setFullName] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [phone, setPhone] = useState()
    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
        setTimeout(() => {
            navigate("/")
        }, 4000)
    }
    const RegisterHandler = (e) => {
        e.preventDefault()
        dispatch(register({ email: registerEmail, password: registerPassword, fullName, passwordConfirm, phone }))
        setTimeout(() => {
            navigate("/")
        }, 4000)

    }
    return (
        <>
            <div className="container cont-sign">
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="login">
                        <form className="form" id="loginForm" method="post" onSubmit={(e) => loginHandler(e)}>
                            <label htmlFor="chk" aria-hidden="true">Log in</label>
                            <input className="input" type="email" name="email" placeholder="Email" required="" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
                            <input className="input" type="password" name="password" placeholder="Password" required="" id="loginPass" onChange={(e) => setPassword(e.target.value)} />
                            <button id="loginBtn">Log in</button>
                        </form>
                    </div>

                    <div className="register">
                        <form className="form" id="registerForm" onSubmit={(e) => RegisterHandler(e)}>
                            <label htmlFor="chk" aria-hidden="true">Register</label>
                            <input className="input" type="text" name="fullName" placeholder="Username" required onChange={(e) => setFullName(e.target.value)} />
                            <input className="input" type="email" name="email" placeholder="Email" required onChange={(e) => setRegisterEmail(e.target.value)} />
                            <input className="input" type="password" name="password" placeholder="Password" required minLength="8" onChange={(e) => setRegisterPassword(e.target.value)} />
                            <input className="input" type="password" name="passwordConfirm" placeholder="Confirm Password" required
                                minLength="8" onChange={(e) => setPasswordConfirm(e.target.value)} />
                            <input className="input" type="text" name="phone" placeholder="Phone Number" required onChange={(e) => setPhone(e.target.value)} />
                            <button id="registerBtn">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInUp