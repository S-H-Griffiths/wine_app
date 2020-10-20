import React from "react";
// import axios from "./axios";

export default function Selection() {
    return (
        <div className="halves">
            <div className="left">
                <h1>NOT SURE WHAT TO HAVE WITH DINNER TONIGHT?</h1>
                <h2>LET US HELP</h2>
                <a className="button" href="/selection">
                    BEGIN
                </a>
            </div>
            <div className="right">
                <img className="shelf" src="./img/shelf.jpg" />
            </div>
        </div>
    );
}
