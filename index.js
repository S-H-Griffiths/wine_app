const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db.js");
const cryptoRandomString = require("crypto-random-string");
const { decodeBase64 } = require("bcryptjs");
const { compare, hash } = require("./bc");
const cookieSession = require("cookie-session");
// const { send } = require("./ses.js");
// const s3 = require("./s3.js");
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

app.get("/logout", (req, res) => {
    console.log("user hit logout route");
    req.session.userId = null;
    res.redirect("/welcome");
});

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
        // algorithm goes here
        let { rows } = await db.createSearch(req.body.ingredient[0]);
        console.log("ingredient", rows);
        res.json({
            falsedata1: rows[0].ingredient,
            falsedata2: rows[0].ingredient,
            falsedata3: rows[0].ingredient,
        });
    } catch (e) {
        console.log("error getting list", e);
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
