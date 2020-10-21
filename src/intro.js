import React from "react";
// import axios from "./axios";

export default function Selection() {
    return (
        <div className="halves">
            <div className="left">
                <h1 className="white">
                    NOT SURE WHAT TO HAVE WITH DINNER TONIGHT?
                </h1>
                <h2 className="white">LET US HELP</h2>
                <p className="white margin">
                    Our recommendation engine will pair real food you actually
                    eat with a great wine from a local wine shop. Support local
                    businesses and learn a little about what you're drinking!
                </p>
                <a className="button" href="/selection">
                    BEGIN
                </a>
            </div>
            <div className="right">
                <img className="shelf" src="./img/dark.jpg" />
            </div>
        </div>
    );
}
