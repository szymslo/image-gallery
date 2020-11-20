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

