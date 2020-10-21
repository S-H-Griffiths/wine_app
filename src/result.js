import React, { useState, useEffect } from "react";
import axios from "./axios";
import Card from "./results-card";

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

    // const saveWine = (e) => {
    //     (async () => {
    //         let wine = e.target.name;
    //         let save = {
    //             wine_id: wine,
    //         };
    //         await axios.post("/save-wine", save);
    //         for (var i = 0; i < wineList.length; i++) {
    //             if (wineList[i].id == wine && wineList[i].class == "saved") {
    //                 wineList[i].class = "notsaved";
    //             } else if (
    //                 wineList[i].id == wine &&
    //                 wineList[i].class == "notsaved"
    //             ) {
    //                 wineList[i].class = "saved";
    //             }
    //         }
    //         wineFunction(wineList);
    //     })();
    // };
    return (
        <div className="resultContainer">
            <h1>WE RECOMMEND THESE BASED ON YOUR CHOICES</h1>
            <div>
                <Card
                    wineList={wineList}
                    userResults={userResults}
                    wineFunction={wineFunction}
                />
                {/* {userResults.map((item, i) => {
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
                })} */}
            </div>
            <div>Save wines to your account to revisit later.</div>
        </div>
    );
}
