import React from "react";
import { Link } from "react-router-dom";

export default function Logo(props) {
    // console.log("props", props);
    return (
        <Link to="/" className="wine">
            WHAT WINE.
        </Link>
    );
}
