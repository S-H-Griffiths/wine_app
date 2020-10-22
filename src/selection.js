import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";

export default function Selection({ wineList }) {
    const [userInput, setuserInput] = useState("");
    const [searchList, setsearchList] = useState([]);
    const [ingredientList, setingredientList] = useState([]);
    const [budget, setBudget] = useState([]);
    const [userResults, setuserResults] = useState({});
    const history = useHistory();
    useEffect(() => {
        (async () => {
            let ignore = false;
            if (userInput) {
                try {
                    const { data } = await axios.get(
                        "/user-search/" + userInput
                    );
                    if (!ignore) {
                        setsearchList(data);
                    } else {
                        console.log("ignore");
                    }
                } catch (e) {
                    console.log("error in request", e);
                }
            } else {
                setsearchList([]);
            }
            return () => {
                ignore = true;
            };
        })();
    }, [userInput]);
    const addIngredient = (eep) => {
        setingredientList(ingredientList.concat(eep.ingredient));
        // WOULD LOVE TO CLEAR THE SEARCH FIELD
        eep = "";
        setuserInput(eep);
    };
    const updateBudget = ({ target }) => {
        const exists = budget.some((item) => item === target.name);
        if (!exists) {
            setBudget((budget) => {
                return [...budget, target.name];
            });
        } else {
            setBudget(budget.filter((item) => item !== target.name));
        }
    };
    const clickButton = () => {
        (async () => {
            try {
                let meal = {
                    ingredient: ingredientList,
                    budget: budget,
                    // evening_type: eveningType,
                };
                console.log("meal", meal);
                const resp = await axios.post("/select-wine", meal);
                wineList(resp.data.winelist);
                history.push("/result");
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
            <div className="imgbcg">
                <div className="selection">
                    <div className="left">
                        <h1>FIND A MATCH FOR YOUR MEAL.</h1>
                        <h2>WHAT ARE YOU PLANNING TO EAT?</h2>
                        <div className="ingredients">
                            <div>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="ingredients"
                                    autoComplete="off"
                                    placeholder="SEARCH"
                                    className="searchField"
                                />
                                {searchList.map((item, i) => {
                                    return (
                                        <div
                                            className="searchList"
                                            key={i}
                                            onClick={() => addIngredient(item)}
                                        >
                                            <p>{item.ingredient}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <h2>WHAT IS YOUR BUDGET?</h2>

                        <div className="attributes">
                            <div>
                                <input
                                    type="checkbox"
                                    name="budget1"
                                    onClick={(e) => updateBudget(e)}
                                ></input>
                                {/* <img className="icon" src="./img/glass.png" /> */}
                                <label htmlFor="budget1">
                                    SOMETHING SIMPLE (€2-€7)
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="budget2"
                                    onClick={(e) => updateBudget(e)}
                                />
                                {/* <img className="icon" src="./img/glass.png" /> */}
                                <label htmlFor="budget2">
                                    A BIT NICER THAN NORMAL(€7-€12)
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="budget3"
                                    onClick={(e) => updateBudget(e)}
                                />
                                {/* <img className="icon" src="./img/glass.png" /> */}
                                <label htmlFor="budget3">
                                    SOMETHING TO CELEBRATE(€12+)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="recipe">
                            <h2 className="white">YOUR SELECTIONS</h2>
                            {ingredientList.map((item, i) => {
                                return (
                                    <div className="list" key={i}>
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => clickButton()}
                            className="submit"
                            type="submit"
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
