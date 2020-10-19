const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/wine"
);

module.exports.createSearch = (name) => {
    //algorithm
    const u = `SELECT * FROM ingredients (ingredient) WHERE ingredient = ($1) `;
    const replies = [name];
    return db.query(u, replies);
};

module.exports.getSearchedUsers = (userInput) => {
    const s = `SELECT * FROM ingredients WHERE ingredient ILIKE $1;`;
    const replies = [userInput + "%"];
    return db.query(s, replies);
};
