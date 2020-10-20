DROP TABLE IF EXISTS ingredient_tag;

 CREATE TABLE ingredient_tag(
    id SERIAL PRIMARY KEY,
    ingredient_id VARCHAR(255) NOT NULL,
    tag_ids integer ARRAY[3]
      );


INSERT INTO ingredient_tag (ingredient_id, tag_ids)
VALUES 
('6', ARRAY[4,8,3]),
('9', ARRAY[2,5,6] ),
('10', ARRAY[8,6] ),
('11', ARRAY[8,6] ),
('12', ARRAY[7,2] ),
('1', ARRAY[3,6] );


CREATE TABLE ingredient_tag(
    id SERIAL PRIMARY KEY,
    ingredient_id INT REFERENCES ingredients(id) NOT NULL,
    tag_ids INT REFERENCES taste_tags(id) NOT NULL 
      );

INSERT INTO ingredient_tag (ingredient_id, tag_ids)
VALUES 
(15,7),
(6, 4),
(6, 8),
(6, 3),
(9, 2 ),
(9, 5 ),
(9, 6 ),
(10, 8 ),
(10, 6 ),
(11, 8 ),
(11, 6 ),
(12, 7 ),
(12, 2 ),
(1, 3 ),
(1, 6 );


