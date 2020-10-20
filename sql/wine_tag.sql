DROP TABLE IF EXISTS wine_tag;

 CREATE TABLE wine_tag(
    id SERIAL PRIMARY KEY,
    wine_id INT REFERENCES wine(id) NOT NULL,
    tag_id INT REFERENCES taste_tags(id) NOT NULL
      );

    INSERT INTO wine_tag (wine_id, tag_id) VALUES (1,7 )



    INSERT INTO wine_tag (wine_id, tag_id) VALUES 
    (2,7 ),
    (2,4 ),
    (2,3 ),
    (3,2 ),
    (3,8 ),
    (3,7 ),
    (3,1 ),
    (3,3 );

