CREATE DATABASE gallery;

--create extension if not exists "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL,
    UNIQUE (user_email)
);

CREATE TABLE images (
    image_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_name VARCHAR(255) NOT NULL,
    image_data BYTEA NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
	        REFERENCES users(user_id)
);

