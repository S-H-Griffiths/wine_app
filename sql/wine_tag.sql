DROP TABLE IF EXISTS wine_tag;

 CREATE TABLE wine_tag(
    id SERIAL PRIMARY KEY,
    wine_id INT REFERENCES wine(id) NOT NULL,
    tag_id INT REFERENCES taste_tags(id) NOT NULL
      );

    INSERT INTO wine_tag (wine_id, tag_id) VALUES (1,7 )



    INSERT INTO wine_tag (wine_id, tag_id) VALUES 
    (1,7 ),
    (2,3 ),
    (3,4 ),
    (4,5 ),
(5,	6),
(6,	7),
(7,	4),
(8,	2),
(9,	4),
(10,	3),
(11,	7),
(12,	6),
(13,	1),
(14,	2),
(15,	7),
(16,	7),
(17,	4),
(18,	4),
(19,	6),
(20,	3);