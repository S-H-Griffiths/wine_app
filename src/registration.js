import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Registration({ loggedIn }) {
    const [values, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/register", values);
    useEffect(() => {
        if (loggedIn) {
            console.log("the user is logged in so redirecting");
            location.replace("/");
        }
    }, []);
    return (
        <div>
            <div className="login">
                {error && (
                    <div className="error">
                        Something went wrong, please try again
                    </div>
                )}
                <p className="list">PLEASE CREATE AN ACCOUNT</p>
                <input
                    className="shopInput"
                    name="first"
                    placeholder="First Name"
                    onChange={handleChange}
                />
                <input
                    className="shopInput"
                    name="last"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
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
                <button onClick={submit} className="registerButton">
                    Register
                </button>
                <Link to="/login" className="close">
                    Already registered? Click to Login
                </Link>
            </div>
        </div>
    );
}
