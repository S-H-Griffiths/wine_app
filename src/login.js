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
            <p>Please login to view your account</p>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <button onClick={submit}>Login</button>
            <Link to="/">No account yet? Click to register</Link>
            <Link to="/reset">Forgot password?</Link>
        </div>
    );
}
