DROP TABLE IF EXISTS taste_tags;

 CREATE TABLE taste_tags(
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL
      );


INSERT INTO taste_tags (tag_name)
VALUES 
('Fruity and light'),
('Fruity and medium bodied'),
('Aromatic and supple'),
('Aromatic and robust'),
('Delicate and light'),
('Fruity and vibrant'),
('Aromatic and mellow'),
('Fruity and sweet'),
('Fruity and extra sweet');