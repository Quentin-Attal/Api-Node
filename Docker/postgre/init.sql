CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR(60)  NOT NULL
);

INSERT INTO users (name, email, password)
VALUES ('John Doe', 'john@example.com', '$2a$10$Q1c4R7G/rijEQ4MFiSI/repjfvsk/tvpFph6hg1VDQSVAFht3Q.nS'),
       ('Jane Doe', 'jane@example.com', '$2a$10$Q1c4R7G/rijEQ4MFiSI/repjfvsk/tvpFph6hg1VDQSVAFht3Q.nS');

GRANT ALL PRIVILEGES ON DATABASE nodeapi TO docker;