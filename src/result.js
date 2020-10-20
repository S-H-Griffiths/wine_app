import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Result({ wineList }) {
    const [userResults, setuserResults] = useState([]);

    useEffect(() => {
        // on page load, get the results

        console.log("winelist in result page", wineList);
        setuserResults(wineList);
        console.log("userResults", userResults);
    }, []);
    return (
        <div className="resultContainer">
            <h1>Your choices resulted in finding a nice bottle</h1>
            <div>
                {userResults.map((item, i) => {
                    return (
                        <div className="resultCard" key={i}>
                            <img
                                className="resultCardimg"
                                src="./img/wine-bottle.png"
                            />
                            <div>
                                <p>
                                    {item.wine_name}, {item.grape}
                                </p>
                                <p>{item.year}</p>
                                <p>Description: {item.wine_description}</p>
                            </div>
                            <div>
                                <p>Available at: {item.shop}</p>
                                <p>For €{item.price}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
