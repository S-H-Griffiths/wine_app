import React, { useState, useEffect } from "react";
import Card from "./results-card";
import axios from "./axios";

export default function Saved({ wineFunction, userType, loggedIn }) {
    const [user, setUser] = useState([]);
    const [wineList, setwineList] = useState([]);
    const [userResults, setuserResults] = useState([]);

    useEffect(() => {
        if (!loggedIn || userType != "regular") {
            console.log("the user isnt logged in so redirecting");
            location.replace("/");
        }
        (async () => {
            let resp = await axios.get("/get-user-wines");
            // console.log("rows from db", resp.data.user, resp.data.wines);
            let wines = resp.data.wines;
            for (var i = 0; i < wines.length; i++) {
                // console.log("wines[i", wines[i]);
                wines[i].class = "saved";
            }
            setuserResults(wines);
            setwineList(wines);
            setUser(resp.data.user);
            // console.log("userResults", userResults);
            // console.log("wineList", wineList);
        })();
    }, []);
    return (
        <>
            <div className="imgbcg">
                <div className="resultContainer">
                    <h1>
                        Hello {user.firstname}, these are your saved wines.{" "}
                    </h1>
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
