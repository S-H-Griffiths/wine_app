import React from "react";
import axios from "./axios";

export default function Selection() {
    return (
        <>
            <div className="selection">
                <h1>Complete these questions to find a match for your meal.</h1>
                <h2>What are you planning to eat</h2>
                <div>
                    <p>SELECTIONS - Planning a search field</p>
                    <input type="text" name="ingredients" />
                </div>
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
                <a className="button" href="/result">
                    SUBMIT
                </a>
            </div>
        </>
    );
}
