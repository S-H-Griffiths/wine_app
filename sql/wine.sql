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



    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES ('Granbeau', '2018', 'Chardonnay-Viognier', 'Not from a local wine shop, just really good', 'Rewe', 6.95)

    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES ('FakeWine1', '2018', 'Pinot Gris', 'Yummy Herrfurthst Yummy', 'MyWineShop', 44),('FakeWine2', '2018', 'Chardonnay', 'Yummy Herrfurthst Yummy', 'MyWineShop', 11);

    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES ('FakeWine2', '2018', 'Chardonnay', 'Yummy Herrfurthst Yummy', 'MyWineShop', 11)

    INSERT INTO wine (wine_name, year, grape, wine_description, shop, price) VALUES
    ('Granbeau', '2018', 'Chardonnay-Viognier', 'Not from a local wine shop, just really good', 'Rewe', 6.95),
('Damalisco Roble',	'2018',	'Tempranillo',	'Reminiscent of blackberries, plums, cherries, vanilla, toast, coffee and violets.'	,'Vin Aqua Vin'	,6.9),
('Pablo Claro',	'2019',	'Cabernet Sauvignon',	'Biodynamic. Deep ruby red in colour. Vanilla, dark fruit and smokey.', 	'Vin Aqua Vin',	9.9	),
('Weegmüller',	'2019',	'Grüner Veltliner',	'Juicy, stone fruit. Strong mineral streak.',	'Vin Aqua Vin',	9.9),
('Kiefer', 	'2019',	'Grauburgunder'	,'Clean Grauburgunder, almond yellow colour. Apricot, white peach.',	'Vin Aqua Vin',	7.9),
('Bonfante & Chiarle',	'2019',	'Cortese'	,'Fresh, intensive fruit bouquet , dry and fine.'	,'Vin Aqua Vin',	9.8),
('Mandoria',	'2019',	'Primitivo'	,'Fine-spicy, fruity and soft red wine'	,'Vin Aqua Vin',	6.7	),
('Il Faggio',	'2018',	'Montepulciano',	'Titillatingly tangy on the tongue followed by cherry chocolate.',	'Vin Aqua Vin',	6.9),
('Aimery' ,	'2017'	,'Cabernet Sauvignon',	'Pepper currants red fruit elegant tannins','Vin Aqua Vin',	5.5),
('Chateau DAlbas' ,	'2015',	'Grenache Syrah',	'Deep colour with garnet tints. Very jammy',	'Vin Aqua Vin',	12.9),
('Cote Chalonnaise',	'2018',	'Chardonnay',	'Classic Burgundy',	'Vin Aqua Vin',	7.9	),
('Fleur de Ninon',	'2018',	'Sauvignon Blanc, Sémillo',	'Fresh and vibrant with refreshing acidity.',	'Vin Aqua Vin',	8),	
('Chateau Ninon',	'2016',	'Cabernet Sauvignon, Merlot',	'Hints of cherry, pretty dry.',	'Vin Aqua Vin',	7.5	),
('Chateau Ninon Cuveé Théo',	'2016',	'Cabernet Sauvignon, Cabernet Franc, Merlot',	'Fresh and fruity',	'Vin Aqua Vin',	9.9),
('Mâcon-Villages Albert Bichot',	'2018',	'Chardonnay',	'Pear, oak, vanilla, almond, honey, and lemon at the finish.',	'Vin Aqua Vin',	13.9),
('Domaine Long-Depaquit',	'2018',	'Chardonnay',	'Pale yellow, Light, Crisp and fresh. Orchard fruit, and citrus. Balanced acidity',	'Vin Aqua Vin',	22.9	),
('Chateau Viella',	'2018',	'Tannat',	'Deep purple red in color. Ripe berries and earthy notes on the nose.',	'Vin Aqua Vin',	9.4	),
('Monte das Anforas',	'2017',	'Alfrocheiro Preto','Dark, brooding wine, very dense and dominated by its youthful tannins',	'Vin Aqua Vin',	6.9	),
('Clos Henri',	'2018',	'Sauvignon Blanc, Sémillo',	'Dry, good citrus tones.. works well with oysters and sushi.',	'Vin Aqua Vin',	15.9),
('Meia Pipa',	'2017',	'Shiraz/Syrah, Castelao',	'Vanilla and spices from oak barrels. Slightly buttery.',	'Vin Aqua Vin',	10.9	);


DELETE  FROM wine;