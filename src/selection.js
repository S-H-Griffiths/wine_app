import React, { useState, useEffect } from "react";
import axios from "./axios";
// import { addIngredient } from "../db";

export default function Selection() {
    const [userInput, setuserInput] = useState("");
    const [searchList, setsearchList] = useState([]);
    const [ingredientList, setingredientList] = useState([]);
    useEffect(() => {
        (async () => {
            // console.log("lets see what happens here");
            let ignore = false;
            if (userInput) {
                try {
                    const { data } = await axios.get(
                        "/user-search/" + userInput
                    );
                    console.log("did the db reply", data);
                    if (!ignore) {
                        // console.log("userList", userList);
                        setsearchList(data);
                    } else {
                        // console.log("ignore");
                    }
                } catch (e) {
                    console.log("error in request", e);
                }
            } else {
                setsearchList([]);
            }
            return () => {
                // cleanup function
                // console.log("cleanup runs");
                ignore = true;
            };
        })();
    }, [userInput]);
    const addIngredient = (eep) => {
        console.log("eep", eep);
        setingredientList(eep.ingredient);
    };
    const clickButton = () => {
        (async () => {
            try {
                // console.log("user input is: ", userInput);
                let meal = {
                    ingredient: userInput,
                };
                const resp = await axios.post("/select-wine", meal);
                // console.log("response from the DB", resp.data);
            } catch (e) {
                console.log("error in request", e);
            }
        })();
    };
    const handleChange = (e) => {
        setuserInput(e.target.value);
    };
    return (
        <>
            <div className="selection">
                <h1>Complete these questions to find a match for your meal.</h1>
                <h2>What are you planning to eat</h2>
                <div>
                    <p>SELECTIONS - Planning a search field</p>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="ingredients"
                    />
                </div>
                {searchList.map((item, i) => {
                    return (
                        <div
                            className="searchList"
                            key={i}
                            onClick={addIngredient(item)}
                        >
                            <p>{item.ingredient}</p>
                        </div>
                    );
                })}
                {/* <div className="recipe">
                    {ingredientList.map((item, i) => {
                        return (
                            <div className="searchList" key={i}>
                                <p>{item}</p>
                            </div>
                        );
                    })}
                </div> */}
                <h2>What kind of budget?</h2>
                <div className="selection">
                    <div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value="2"
                            className="slider"
                            name="budget1"
                        ></input>
                        <label for="budget1"> Something simple (€4-€7)</label>
                    </div>
                    {/* <div>
                        <input type="checkbox" name="budget2" />
                        <label for="budget2">
                            A bit nicer than normal(€7-€12)
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" name="budget3" />
                        <label for="budget3">
                            Something to celebrate(€12-€20)
                        </label>
                    </div> */}
                </div>
                <h2>Is it a special occasion?</h2>
                <div className="selection">
                    <div>
                        <input type="checkbox" name="occasion1" />
                        <label for="occasion1"> Dinner with friends</label>
                    </div>
                    <div>
                        <input type="checkbox" name="occasion2" />
                        <label for="occasion2"> Romantic evening</label>
                    </div>
                    <div>
                        <input type="checkbox" name="occasion3" />
                        <label for="occasion3"> Something to celebrate</label>
                    </div>
                </div>
                <button onClick={clickButton} className="button">
                    SUBMIT
                </button>
                {/* <a onClick={clickButton} className="button" href="/result">
                    SUBMIT
                </a> */}
            </div>
        </>
    );
}
