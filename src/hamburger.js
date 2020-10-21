import React from "react";
import { Link } from "react-router-dom";

export default function Hamburger({ toggleUploader }) {
    return (
        <div className="darkened">
            <div className="navigationBar">
                <p className="close" onClick={() => toggleUploader()}>
                    X
                </p>
                <h2 className="navText">NAVIGATION</h2>
                <Link to="/" className="navText">
                    - HOME
                </Link>
                <Link to="/selection" className="navText">
                    - NEW SELECTION
                </Link>
                <Link to="/logout" className="navText">
                    - LOGOUT
                </Link>
            </div>
        </div>
    );
}
