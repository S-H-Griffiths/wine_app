import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/register", values);

    return (
        <div className="right">
            {error && (
                <div className="error">
                    Something went wrong, please try again
                </div>
            )}
            <p>Please create an account</p>
            <input
                name="first"
                placeholder="First Name"
                onChange={handleChange}
            />
            <input
                name="last"
                placeholder="Last Name"
                onChange={handleChange}
            />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <button onClick={submit}>Register</button>
            <Link to="/login">Already registered? Click to Login</Link>
        </div>
    );
}
