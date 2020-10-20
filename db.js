const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/wine"
);

// this one might be redundant
module.exports.createSearch = (name) => {
    const u = `SELECT * FROM ingredients ingredient WHERE ingredient = $1 `;
    const replies = [name];
    return db.query(u, replies);
};

module.exports.getSearchedUsers = (userInput) => {
    const s = `SELECT * FROM ingredients WHERE ingredient ILIKE $1;`;
    const replies = [userInput + "%"];
    return db.query(s, replies);
};

module.exports.addIngredient = (ingredient) => {
    const s = `INSERT INTO ingredients (ingredient) VALUES ($1)`;
    const replies = [ingredient];
    return db.query(s, replies);
};

module.exports.matchIngredientTags = (ingredientList, minPrice, maxPrice) => {
    const s = `SELECT wine.id, wine_name, year, grape, price, wine_description, shop FROM wine_tag
    INNER JOIN wine ON wine.id = wine_tag.wine_id
    INNER JOIN
        (SELECT tag_ids, COUNT (tag_ids) AS "freq" FROM ingredients
        INNER JOIN ingredient_tag ON ingredients.id = ingredient_tag.ingredient_id
        WHERE ingredients.ingredient = ANY ($1)
        GROUP BY tag_ids
        ORDER BY "freq" DESC
        LIMIT 2 )
        AS top_tag ON top_tag.tag_ids = wine_tag.tag_id
    WHERE wine.price > $2 
    AND wine.price <= $3
    LIMIT 5`;
    const replies = [ingredientList, minPrice, maxPrice];
    return db.query(s, replies);
};

module.exports.registerUser = (first, last, email, password) => {
    const i = `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const replies = [first, last, email, password];
    return db.query(i, replies);
};

module.exports.getHashedPw = (email) => {
    const p = `SELECT password, id FROM users WHERE email = ($1)`;
    const replies = [email];
    return db.query(p, replies);
};

module.exports.insertCode = (email, secretCode) => {
    const c = `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING *`;
    const replies = [email, secretCode];
    return db.query(c, replies);
};

module.exports.verifyCode = (email) => {
    const c = `SELECT code FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY id DESC LIMIT 1`;
    const replies = [email];
    return db.query(c, replies);
};

module.exports.userSaveWine = (userId, wineId) => {
    const c = `INSERT INTO saved_wine (user_id, wine_id) VALUES ($1, $2) RETURNING *`;
    const replies = [userId, wineId];
    return db.query(c, replies);
};

module.exports.checkSavedWine = (userId, wineId) => {
    const c = `SELECT * FROM saved_wine WHERE user_id = $1 AND wine_id = $2`;
    const replies = [userId, wineId];
    return db.query(c, replies);
};

module.exports.deleteSaved = (userId, wineId) => {
    const c = `DELETE FROM saved_wine WHERE user_id = $1 AND wine_id = $2`;
    const replies = [userId, wineId];
    return db.query(c, replies);
};
