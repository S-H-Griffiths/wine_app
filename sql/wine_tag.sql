DROP TABLE IF EXISTS wine_tag;

 CREATE TABLE wine_tag(
    id SERIAL PRIMARY KEY,
    wine_id INT REFERENCES wine(id) NOT NULL,
    tag_id INT REFERENCES taste_tags(id) NOT NULL
      );

    INSERT INTO wine_tag (wine_id, tag_id) VALUES (1,7 )
