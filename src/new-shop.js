import React, { useEffect } from "react";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Shop({ loggedIn }) {
    const [values, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/add-shop", values);
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
                <p className="list">
                    PLEASE REGISTER YOUR SHOP WITH US BY CREATING AN ACCOUNT
                </p>
                <input
                    className="shopInput"
                    name="first"
                    placeholder="Shop Name"
                    onChange={handleChange}
                />
                <input
                    className="shopInput"
                    name="last"
                    placeholder="Address"
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
            </div>
        </div>
    );
}
