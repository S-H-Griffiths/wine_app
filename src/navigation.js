import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ toggleUploader }) {
    return (
        <div className="navLinks">
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
