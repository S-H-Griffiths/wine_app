import React, { useState, useEffect } from "react";
import axios from "./axios";
import Card from "./results-card";
import { Link } from "react-router-dom";

export default function Result({ wineList, wineFunction }) {
    const [userResults, setuserResults] = useState([]);

    useEffect(() => {
        (async () => {
            const resp = await axios.post("/check-saved-wines", wineList);
            for (var i = 0; i < wineList.length; i++) {
                if (resp.data.list.includes(wineList[i].id)) {
                    wineList[i].class = "saved";
                } else {
                    wineList[i].class = "notsaved";
                }
            }
            setuserResults(wineList);
        })();
    });
    return (
        <div className="imgbcg">
            <div className="resultContainer">
                <h1>WE RECOMMEND THESE BASED ON YOUR CHOICES</h1>
                <Link to="/register" className="navTest">
                    CREATE AN ACCOUNT TO SAVE WINES AND REVISIT LATER
                </Link>
                <div>
                    <Card
                        wineList={wineList}
                        userResults={userResults}
                        wineFunction={wineFunction}
                    />
                </div>
            </div>
        </div>
    );
}
