const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db.js");
const cryptoRandomString = require("crypto-random-string");
const { decodeBase64 } = require("bcryptjs");
const { compare, hash } = require("./bc");
const cookieSession = require("cookie-session");
const { send } = require("./ses.js");
const s3 = require("./s3.js");
const csurf = require("csurf");

//////////////////////////////////////////////
//////////////////MIDDLEWARE//////////////////
//////////////////////////////////////////////
app.use(express.static("public"));
app.use(express.json());
app.use(compression());
app.use(
    cookieSession({
        secret: `fhfdjkhdkj§$bjkd23248(§)"(§)`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        // httpOnly: true,
        sameSite: true,
    })
);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

///////////////////////////////////////////
//////////////////ROUTES//////////////////
/////////////////////////////////////////

//////////// LOGIN AND OUT //////////////

app.get("/logout", (req, res) => {
    console.log("user hit logout route");
    req.session.userId = null;
    res.redirect("/welcome");
});

app.post("/register", (req, res) => {
    var { first, last, email, password } = req.body;
    console.log("coming through", req.body);
    if (!first || !last || !email || !password) {
        res.json({ success: false });
    } else {
        hash(password).then((hashPw) => {
            db.registerUser(first, last, email, hashPw)
                .then((result) => {
                    req.session.userId = result.rows[0].id;
                    res.json({ success: true });
                })
                .catch((e) => {
                    console.log("error in registration post", e);
                });
        });
    }
});

app.post("/login", (req, res) => {
    var { email, password } = req.body;
    console.log("hitting login route", req.body);
    if (!email || !password) {
        res.json({ success: false });
    } else {
        db.getHashedPw(email)
            .then((result) => {
                compare(password, result.rows[0].password)
                    .then((comparedValues) => {
                        console.log("comparedValues", comparedValues);
                        if (comparedValues === true) {
                            req.session.userId = result.rows[0].id;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch((e) => {
                        console.log("error in registration post", e);
                        res.json({ success: false });
                    });
            })
            .catch((e) => {
                console.log("error in registration post", e);
                res.json({ success: false });
            });
    }
});

app.post("/reset-email", (req, res) => {
    var { email } = req.body;
    if (!email) {
        res.json({ success: false });
    } else {
        const secretCode = cryptoRandomString({
            length: 6,
        });
        db.insertCode(email, secretCode)
            .then((result) => {
                console.log("result", result);
                //send email
                send(email, secretCode, "Password Reset Code");
                res.json({ success: true });
            })
            .catch((e) => {
                console.log("error in registration post", e);
                res.json({ success: false });
            });
    }
});

app.post("/reset-password", (req, res) => {
    var { email, code, password } = req.body;
    if (!code || !password) {
        res.json({ success: false });
    } else {
        console.log("received info", email, code, password);
        db.verifyCode(email)
            .then((result) => {
                console.log("result", result.rows[0].code);
                if (code === result.rows[0].code) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            })
            .catch((e) => {
                console.log("error in registration post", e);
                res.json({ success: false });
            });
    }
});

app.get("/welcome", function (req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//////////// FOR LOGGED IN USERS //////////////

app.get("/user-search/:userInput", async (req, res) => {
    try {
        let { rows } = await db.getSearchedUsers(req.params.userInput);
        res.json(rows);
    } catch (e) {
        console.log("error getting list", e);
    }
});

app.post("/select-wine", async (req, res) => {
    try {
        var maxPrice;
        var minPrice;
        console.log("data from request", req.body.budget, req.body.ingredient);
        if (req.body.budget == "budget1") {
            maxPrice = 7;
            minPrice = 0;
        } else if (req.body.budget == "budget2") {
            maxPrice = 12;
            minPrice = 6;
        } else {
            maxPrice = 50;
            minPrice = 12;
        }
        console.log("price range: ", minPrice, maxPrice);
        let { rows } = await db.matchIngredientTags(
            req.body.ingredient,
            minPrice,
            maxPrice
        );
        // console.log("db response: ", rows);
        res.json({
            winelist: rows,
        });
    } catch (e) {
        console.log("error getting list", e);
    }
});

app.post("/check-saved-wines", async (req, res) => {
    try {
        // console.log("save wine", req.body);
        var savedWine = [];
        for (var i = 0; i < req.body.length; i++) {
            let { rows } = await db.checkSavedWine(
                req.session.userId,
                req.body[i].id
            );
            if (rows.length) {
                savedWine.push(rows[0].wine_id);
            }
            // console.log("rows", rows);
            // console.log("savedWine", savedWine);
        }
        res.json({ list: savedWine });
    } catch (e) {
        console.log("error in get saved", e);
    }
});

app.post("/save-wine", async (req, res) => {
    try {
        // check first if the thing is already saved, delete if there or add first.
        let data = await db.checkSavedWine(
            req.session.userId,
            req.body.wine_id
        );
        console.log("is there a saved relation already?", data.rows);
        // if already saved
        if (data.rows.length) {
            console.log("deleting from the db");
            await db.deleteSaved(req.session.userId, req.body.wine_id);
            res.json({ success: true });
        } else {
            let { rows } = await db.userSaveWine(
                req.session.userId,
                req.body.wine_id
            );
            console.log("saved in the db", rows);
            res.json({ rows });
        }
    } catch (e) {
        console.log("error in save", e);
    }
});

// this must be the last route in the file!!!!
app.get("*", function (req, res) {
    // if (!req.session.userId) {
    //     res.redirect("/welcome");
    // } else {
    res.sendFile(__dirname + "/index.html");
    // }
});

app.listen(8080, function () {
    console.log("Network up and listening.");
});
