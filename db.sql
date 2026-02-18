USE ccdm_db;

CREATE TABLE users(
id SERIAL NOT NULL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
lastname VARCHAR(400),
);

CREATE TABLE task (
id SERIAL PRIMARY KEY,
name VARCHAR(150),
description VARCHAR(500),
priority boolean,
user_id INTEGER REFERENCES users(id),
);

INSERT INTO users (name, lastname) VALUES ('Catalina', 'Delgado');
INSERT INTO users (name, lastname) VALUES ('Fernando', 'valencia');


INSERT INTO task (name, description, priority, user_id) VALUES ('Task of Cati', 'Description for Task 1', true, 1);
INSERT INTO task (name, description, priority, user_id) VALUES ('Task of Fernando', 'Description for Task 2', true, 2);