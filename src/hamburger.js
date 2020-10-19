import React from "react";

export default function Hamburger({ toggleUploader }) {
    return (
        <div className="darkened">
            <div className="navigationBar">
                <p className="close" onClick={() => toggleUploader()}>
                    X
                </p>
                <h2>Navigation</h2>
                <a href="/">Home</a>
                <a href="/selection">New Selection</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
    );
}
