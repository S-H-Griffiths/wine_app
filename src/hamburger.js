import React from "react";
import { Link } from "react-router-dom";
// import axios from "./axios";

export default function Hamburger({ toggleUploader }) {
    return (
        <div className="darkened">
            <div className="navigationBar">
                <p className="close" onClick={() => toggleUploader()}>
                    X
                </p>
                <h2 className="navText">NAVIGATION</h2>
                <Link
                    to="/"
                    className="navText"
                    onClick={() => toggleUploader()}
                >
                    - HOME
                </Link>
                <Link
                    to="/selection"
                    className="navText"
                    onClick={() => toggleUploader()}
                >
                    - NEW SELECTION
                </Link>
                <div>
                    <a className="navText" href="/logout">
                        - LOGOUT
                    </a>
                </div>
            </div>
        </div>
    );
}
