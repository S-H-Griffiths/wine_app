import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ toggleUploader, userType, loggedIn }) {
    console.log("loggedIn", loggedIn);
    console.log("userType", userType);
    return (
        <div className="navLinks">
            {!loggedIn && (
                <>
                    <Link to="/register" className="navTest">
                        CREATE ACCOUNT
                    </Link>
                    <Link to="/login" className="navTest">
                        LOGIN
                    </Link>
                    <Link to="/new-shop" className="navTest">
                        FOR WINE SHOPS
                    </Link>
                </>
            )}
            {loggedIn && (
                <>
                    <Link to="/all-wines">
                        <img
                            src="img/wine-bottle.png"
                            className="navSave"
                            alt="wine icon"
                        />
                    </Link>
                    {userType == "wine_shop" ? (
                        <Link to="/add-wines">
                            <img
                                src="img/plus.png"
                                className="navSave"
                                alt="add icon"
                            />
                        </Link>
                    ) : (
                        <Link to="/saved">
                            <img
                                src="img/notsaved.png"
                                className="navSave"
                                alt="my saved wines"
                            />
                        </Link>
                    )}
                </>
            )}
            <img
                onClick={() => toggleUploader()}
                className="hamburger"
                src="./img/hamburgermenu.svg"
                alt="hamburger menu"
            />
        </div>
    );
}
