DROP TABLE IF EXISTS wine;

 CREATE TABLE wine(
      id SERIAL PRIMARY KEY,
      wine_name VARCHAR(255) NOT NULL,
      year VARCHAR(255) NOT NULL,
      grape VARCHAR(255) NOT NULL,
      wine_description VARCHAR(255) NOT NULL,
      shop VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL
      );



    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES ('Granbeau', '2018', 'Chardonnay-Viognier', 'Yummy Herrfurthst Yummy', 'Rewe', 6.95)

    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES ('FakeWine1', '2018', 'Pinot Gris', 'Yummy Herrfurthst Yummy', 'MyWineShop', 44),('FakeWine2', '2018', 'Chardonnay', 'Yummy Herrfurthst Yummy', 'MyWineShop', 11);

    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES ('FakeWine2', '2018', 'Chardonnay', 'Yummy Herrfurthst Yummy', 'MyWineShop', 11)
