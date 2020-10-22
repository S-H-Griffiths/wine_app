import { useState } from "react";
import axios from "../axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const submit = (e) => {
        e.preventDefault();

        axios
            .post(url, values)
            .then(({ data }) => {
                console.log("success");
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log(`error in axios post /${url}`, err);
                setError(true);
            });
    };

    return [error, submit];
}
