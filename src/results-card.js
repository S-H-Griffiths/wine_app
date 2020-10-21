import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Result({ wineList, wineFunction, userResults }) {
    // const [userResults, setuserResults] = useState([]);

    const saveWine = (e) => {
        (async () => {
            let wine = e.target.name;
            let save = {
                wine_id: wine,
            };
            await axios.post("/save-wine", save);
            for (var i = 0; i < wineList.length; i++) {
                if (wineList[i].id == wine && wineList[i].class == "saved") {
                    wineList[i].class = "notsaved";
                } else if (
                    wineList[i].id == wine &&
                    wineList[i].class == "notsaved"
                ) {
                    wineList[i].class = "saved";
                }
            }
            wineFunction(wineList);
        })();
    };
    return (
        <>
            {userResults.map((item, i) => {
                return (
                    <div className="resultCard" key={i}>
                        <img
                            className="resultCardimg"
                            src="img/wine-bottle.png"
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
                            src={`img/${item.class}.png`}
                            name={`${item.id}`}
                            onClick={(e) => saveWine(e)}
                        />
                    </div>
                );
            })}
        </>
    );
}
