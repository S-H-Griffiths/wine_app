import React from "react";

export default function Navigation({ toggleUploader }) {
    return (
        <img
            onClick={() => toggleUploader()}
            className="hamburger"
            src="./img/hamburgermenu.svg"
            alt="hamburger menu"
        />
    );
}
