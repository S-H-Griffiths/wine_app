import React, { useState, useEffect } from "react";
import axios from "./axios";
// import { async } from "crypto-random-string";
import { useHistory } from "react-router-dom";

export default function Selection() {
    const [userInput, setuserInput] = useState("");
    const [searchList, setsearchList] = useState([]);
    const [ingredientList, setingredientList] = useState([]);
    const [budget, setBudget] = useState([]);
    const [eveningType, seteveningType] = useState([]);
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
        setuserInput("");
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
    const updateOccasion = ({ target }) => {
        const exists = eveningType.some((item) => item === target.name);
        if (!exists) {
            seteveningType((budget) => {
                return [...eveningType, target.name];
            });
        } else {
            seteveningType(eveningType.filter((item) => item !== target.name));
        }
    };
    const clickButton = () => {
        (async () => {
            try {
                let meal = {
                    ingredient: ingredientList,
                    budget: budget,
                    evening_type: eveningType,
                };
                const resp = await axios.post("/select-wine", meal);
                console.log("sending to db", resp.data);
                // might be easiest just to send it back to app
                // let selection = this.props.resp.data;
                // setuserResults(resp.data);
                // this.props.
                // .location
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
            <div className="selection">
                <h1>FIND A MATCH FOR YOUR MEAL.</h1>
                <h2>WHAT ARE YOU PLANNING TO EAT?</h2>
                <div className="ingredients">
                    <div>
                        <p>SELECTIONS</p>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="ingredients"
                            autoComplete="off"
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
                    <div className="recipe">
                        {ingredientList.map((item, i) => {
                            return (
                                <div className="searchList" key={i}>
                                    <p>{item}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <h2>WHAT KIND OF BUDGET?</h2>

                <div className="attributes">
                    <div className="attribute">
                        <input
                            type="checkbox"
                            name="budget1"
                            onClick={(e) => updateBudget(e)}
                        ></input>
                        <img className="icon" src="./img/glass.png" />
                        <label htmlFor="budget1">
                            {" "}
                            SOMETHING SIMPLE (€4-€7)
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="budget2"
                            onClick={(e) => updateBudget(e)}
                        />
                        <img className="icon" src="./img/glass.png" />
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
                        <img className="icon" src="./img/glass.png" />
                        <label htmlFor="budget3">
                            SOMETHING TO CELEBRATE(€12-€20)
                        </label>
                    </div>
                </div>

                <h2>IS IT A SPECIAL OCCASION?</h2>
                <div className="selection">
                    <div>
                        <input
                            type="checkbox"
                            name="occasion1"
                            onClick={(e) => updateOccasion(e)}
                        />
                        <label htmlFor="occasion1"> DINNER WITH FRIENDS</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="occasion2"
                            onClick={(e) => updateOccasion(e)}
                        />
                        <label htmlFor="occasion2"> ROMANTIC EVENING</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="occasion3"
                            onClick={(e) => updateOccasion(e)}
                        />
                        <label htmlFor="occasion3">
                            {" "}
                            SOMETHING TO CELEBRATE
                        </label>
                    </div>
                </div>
                <button
                    onClick={() => clickButton()}
                    className="button"
                    type="submit"
                >
                    SUBMIT
                </button>
            </div>
        </>
    );
}
