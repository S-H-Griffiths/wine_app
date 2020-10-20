import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Result() {
    const [userResults, setuserResults] = useState({});

    // useEffect(() => {
    //     (async () => {
    //         // on page load, get the results
    //         };
    //     })();
    // }, []);
    return (
        <div>
            <h1>Will put a result here</h1>
            <h2>Your choices resulted in finding a nice bottle</h2>
            <div className="resultContainer">
                {userResults.map((item, i) => {
                    return (
                        <div className="resultCard" key={i}>
                            <img
                                className="resultCardimg"
                                src="./img/test.png"
                            />
                            <p>Wine Name, Year, Grape</p>
                            <p>Description</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
