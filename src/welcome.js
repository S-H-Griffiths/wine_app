import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration.js";
import Login from "./login";
import Logo from "./logo";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <>
            <div className="nav">
                <Logo />
            </div>
            <div className="welcome">
                <div className="left">
                    <div className="mblogo">
                        <h1>Help us improve your evening</h1>
                    </div>
                </div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={ResetPassword} />
                    </div>
                </HashRouter>
            </div>
            <footer className="footer">© SIÂN GRIFFITHS 2020</footer>
        </>
    );
}
