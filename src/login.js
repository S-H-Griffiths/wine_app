import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/login", values);

    return (
        <div className="login">
            {error && (
                <div className="error">
                    Incorrect combination, please try again
                </div>
            )}
            <p className="list">PLEASE LOGIN TO VIEW YOUR ACCOUNT</p>
            <input
                className="shopInput"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />
            <input
                className="shopInput"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <button className="registerButton" onClick={submit}>
                Login
            </button>
            <Link to="/" className="close">
                No account yet? Click to register
            </Link>
            <Link to="/reset" className="close">
                Forgot password?
            </Link>
        </div>
    );
}
