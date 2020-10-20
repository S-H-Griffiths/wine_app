const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/wine"
);

module.exports.createSearch = (name) => {
    //algorithm
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
    const s = `SELECT wine_name, year, grape, price, wine_description, shop FROM wine_tag
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
