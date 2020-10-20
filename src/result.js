import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Result({ wineList }) {
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
    }, []);

    const saveWine = (e) => {
        (async () => {
            let save = {
                wine_id: e.target.name,
            };
            const resp = await axios.post("/save-wine", save);
            console.log("db resp", resp);
            // update user results.
            setuserResults(wineList);
        })();
    };
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
                                alt="wine bottle icon"
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
                            <img
                                className="save"
                                src={`./img/${item.class}.png`}
                                name={`${item.id}`}
                                onClick={(e) => saveWine(e)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
