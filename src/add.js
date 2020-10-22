import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";

export default function Add({ toggleUploader, userType, loggedIn }) {
    const [userInput, setuserInput] = useState("");
    const [wineEntry, setwineEntry] = useState({});
    const [error, setError] = useState();
    const history = useHistory();

    const clickButton = () => {
        (async () => {
            try {
                let { data } = await axios.post("/upload-wine", wineEntry);
                {
                    data.success ? history.push("/all-wines") : setError(true);
                }
            } catch (e) {
                console.log("error in request", e);
                setError(true);
            }
        })();
    };
    useEffect(() => {
        if (!loggedIn || userType != "wine_shop") {
            console.log("the user isnt logged in so redirecting");
            location.replace("/");
        }
        setwineEntry({ ...wineEntry, userInput });
    }, [userInput]);
    const updateTags = ({ target }) => {
        console.log("target", target.value);
        setuserInput({
            ...userInput,
            tag: target.value,
        });
        console.log("userInut", userInput);
    };
    const handleChange = (e) => {
        setuserInput({
            ...userInput,
            [e.target.name]: e.target.value,
        });
    };
    console.log("wineEntry", wineEntry);
    return (
        <>
            <div className="upload">
                <h1>INCREASE YOUR SELECTION</h1>
                {error && (
                    <p className="error">
                        Something went wrong, please try again
                    </p>
                )}
                <div className="divide">
                    <div>
                        <h2>DETAILS</h2>
                        <div className="uploadDetails">
                            <label htmlFor="wine_name">NAME</label>
                            <input
                                name="wine_name"
                                type="text"
                                className="niceInput"
                                onChange={handleChange}
                            />
                            <label htmlFor="year">YEAR</label>
                            <input
                                name="year"
                                type="number"
                                className="niceInput"
                                onChange={handleChange}
                            />
                            <label htmlFor="grape">GRAPE</label>
                            <input
                                name="grape"
                                type="text"
                                className="niceInput"
                                onChange={handleChange}
                            />
                            <label htmlFor="wine_description">
                                WINE DESCRIPTION
                            </label>
                            <input
                                name="wine_description"
                                type="text"
                                className="niceInput"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <h2>WHERE IS IT AVAILABLE?</h2>
                            <div className="uploadDetails">
                                <label htmlFor="price">PRICE €</label>

                                <input
                                    name="price"
                                    type="number"
                                    className="niceInput"
                                    onChange={handleChange}
                                />
                                <label htmlFor="shop">SHOP</label>

                                <input
                                    name="shop"
                                    type="text"
                                    className="niceInput"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>TELL US ABOUT THE WINE</h2>
                        <div className="uploadTags">
                            <input
                                type="radio"
                                value="Aromatic and supple"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="aromatic and supple">
                                Aromatic and supple
                            </label>
                            <input
                                type="radio"
                                value="Aromatic and robust"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="Aromatic and robust">
                                Aromatic and robust
                            </label>
                            <input
                                type="radio"
                                value="Aromatic and mellow"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="aromatic and mellow">
                                Aromatic and mellow
                            </label>
                            <input
                                type="radio"
                                value="Delicate and light"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="Delicate and light">
                                Delicate and light
                            </label>
                            <input
                                type="radio"
                                value="Fruity and extra sweet"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="Fruity and extra sweet">
                                Fruity and extra sweet
                            </label>
                            <input
                                type="radio"
                                value="Fruity and light"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="Fruity and light">
                                Fruity and light
                            </label>
                            <input
                                type="radio"
                                value="Fruity and medium bodied"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="fruity and medium bodied">
                                Fruity and medium bodied
                            </label>
                            <input
                                type="radio"
                                value="Fruity and sweet"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="Fruity and sweet">
                                Fruity and sweet
                            </label>
                            <input
                                type="radio"
                                value="Fruity and vibrant"
                                name="tag"
                                onClick={(e) => updateTags(e)}
                            />
                            <label htmlFor="Fruity and vibrant">
                                Fruity and vibrant
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => clickButton()}
                    className="submit position"
                    type="submit"
                >
                    SUBMIT
                </button>
            </div>
        </>
    );
}
