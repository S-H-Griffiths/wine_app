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
            console.log("resp", resp.data);
            wines = resp.data.all_wines;
            // console.log("saved wines", resp.data.saved_wines);
            // if (typeof resp.data.saved_wines == "object")
            let x = typeof resp.data.saved_wines;
            console.log("typeof resp.data.saved_wines", x);
            if (Array.isArray(resp.data.saved_wines)) {
                console.log("its an array");

                // filter over
                //                 let arr = [...resp.data.saved_wines, ...wines];
                //                 console.log("arr", arr);
                //                 let idArr = [];
                //                 for (var i = 0; i < arr.length; i++) {
                //                     push.idArr(arr[i].id);
                //                 }
                // console.log(iddArr)
                //                 let result = [...new Set(arr.id)];
                //                 console.log("result", result);

                //                 let seen = new Set();
                //                 var hasDuplicates = arr.some(function (item) {
                //                     return seen.size === seen.add(item.id).size;
                //                 });
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
                for (var i = 0; i < arr.length; i++) {
                    arr[i].class = "saved";
                }
                //loop through these now
            } else if (typeof resp.data.saved_wines == "object") {
                console.log("its an object");
                for (var i = 0; i < wines.length; i++) {
                    if (wines[i].id == resp.data.saved_wines.id) {
                        wines[i].class = "saved";
                    } else {
                        wines[i].class = "notsaved";
                    }
                }
            } else {
                for (var i = 0; i < wines.length; i++) {
                    wines[i].class = "notsaved";
                }
            }
            setuserResults(wines);
            setwineList(wines);
            // console.log("wineList", wineList);
            // console.log("userResults", userResults);
            // setUser(resp.data.user);
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
