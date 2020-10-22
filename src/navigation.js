import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ toggleUploader }) {
    return (
        <div className="navLinks">
            <Link to="/add-wines">
                <img src="img/plus.png" className="navSave" alt="add icon" />
            </Link>
            <Link to="/all-wines">
                <img
                    src="img/wine-bottle.png"
                    className="navSave"
                    alt="wine icon"
                />
            </Link>
            <Link to="/saved">
                <img
                    src="img/notsaved.png"
                    className="navSave"
                    alt="my saved wines"
                />
            </Link>
            <img
                onClick={() => toggleUploader()}
                className="hamburger"
                src="./img/hamburgermenu.svg"
                alt="hamburger menu"
            />
        </div>
    );
}
