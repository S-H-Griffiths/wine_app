import React, { useState, useEffect } from "react";
import axios from "./axios";
import Card from "./results-card";

export default function Wines({ wineFunction, loggedIn }) {
    const [wineList, setwineList] = useState([]);
    const [userResults, setuserResults] = useState([]);
    useEffect(() => {
        if (!loggedIn) {
            console.log("the user isnt logged in so redirecting");
            location.replace("/");
        }
        (async () => {
            let wines = [];
            const resp = await axios.get("/get-all-wines");
            console.log("is this defined?", resp.data.saved_wines);
            wines = resp.data.all_wines;
            let x = typeof resp.data.saved_wines;
            console.log("typeof resp.data.saved_wines", x);
            if (Array.isArray(resp.data.saved_wines)) {
                let arr = [];
                for (var i = 0; i < wines.length; i++) {
                    for (var u = 0; u < resp.data.saved_wines.length; u++) {
                        console.log("wines[i].id", wines[i].id);
                        console.log(
                            "resp.data.saved_wines[u].id",
                            resp.data.saved_wines[u].id
                        );
                        if (resp.data.saved_wines[u].id == wines[i].id) {
                            arr.push(wines[i]);
                        } else {
                            wines[i].class = "notsaved";
                        }
                    }
                }
                console.log("arr", arr);
                if (!arr.length) {
                    for (var i = 0; i < wines.length; i++) {
                        wines[i].class = "notsaved";
                    }
                }
                console.log("wines in this if", wines);
                for (var i = 0; i < arr.length; i++) {
                    arr[i].class = "saved";
                }
            } else if (typeof resp.data.saved_wines == "object") {
                console.log("its an object");
                for (var i = 0; i < wines.length; i++) {
                    if (wines[i].id == resp.data.saved_wines.id) {
                        wines[i].class = "saved";
                    } else {
                        wines[i].class = "notsaved";
                    }
                }
            } else if (!resp.data.saved_wines) {
                console.log("maybe we got here");
                for (var i = 0; i < wines.length; i++) {
                    wines[i].class = "notsaved";
                }
            }
            setuserResults(wines);
            setwineList(wines);
        })();
    }, []);
    return (
        <>
            <div className="imgbcg">
                <div className="resultContainer">
                    <h1>BROWSE ALL THE WINES IN OUR SELECTION </h1>
                    <Card
                        wineList={wineList}
                        userResults={userResults}
                        wineFunction={wineFunction}
                    />
                </div>
            </div>
        </>
    );
}
