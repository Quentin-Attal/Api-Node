CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR(60)  NOT NULL
);

INSERT INTO users (name, email, password)
VALUES ('John Doe', 'john@example.com', 'test'),
       ('Jane Doe', 'jane@example.com', 'test');