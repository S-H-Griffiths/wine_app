import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    submitEmail() {
        const { email } = this.state;
        console.log("email entered", email);
        axios
            .post("/reset-email", { email })
            .then(({ data }) => {
                console.log("result from server", data);
                if (data.success) {
                    this.setState({
                        current: 2,
                        email: { email },
                    });
                } else {
                    console.log("failed the if");
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => {
                console.log("error in POST request", e);
                this.setState({
                    error: true,
                });
            });
    }
    resetCode() {
        const { code, password } = this.state;
        const email = this.state.email.email;
        console.log("we will post this", code, password);
        axios
            .post("/reset-password", { email, code, password })
            .then(({ data }) => {
                console.log("result from server", data);
                if (data.success) {
                    this.setState({
                        current: 3,
                    });
                    // location.replace("/");
                } else {
                    console.log("failed the if");
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => {
                console.log("error in POST request", e);
                this.setState({
                    error: true,
                });
            });
    }
    render() {
        let elem;
        if (this.state.current == 1) {
            elem = (
                <>
                    <p className="list">RESET PASSWORD</p>
                    <p className="list">Please enter your registered email </p>
                    <input
                        className="shopInput"
                        name="email"
                        placeholder="Email"
                        key="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="registerButton"
                        onClick={() => this.submitEmail()}
                    >
                        Next
                    </button>
                </>
            );
        }
        if (this.state.current == 2) {
            elem = (
                <>
                    <p className="list">RESET PASSWORD</p>
                    <p className="list">
                        A reset code has been emailed to you{" "}
                    </p>
                    <input
                        className="shopInput"
                        name="code"
                        key="code"
                        type="text"
                        placeholder="Enter code"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        className="shopInput"
                        name="password"
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="registerButton"
                        onClick={() => this.resetCode()}
                    >
                        Reset
                    </button>
                </>
            );
        }
        if (this.state.current == 3) {
            elem = (
                <>
                    <Link className="navText" to="/login">
                        Password change successfully. Click to login.
                    </Link>
                </>
            );
        }
        return (
            <div className="login">
                {this.state.error && (
                    <div className="error">
                        That didn't work, please try again
                    </div>
                )}
                {elem}
            </div>
        );
    }
}

export default ResetPassword;
