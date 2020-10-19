DROP TABLE IF EXISTS wine;

 CREATE TABLE wine(
      id SERIAL PRIMARY KEY,
      wine_name VARCHAR(255) NOT NULL,
      year VARCHAR(255) NOT NULL,
      grape VARCHAR(255) NOT NULL,
      wine_description TEXT,
      );

    --   INSERT INTO comments (sender_id, recipient_id, comment) VALUES ($1, $2, $3)