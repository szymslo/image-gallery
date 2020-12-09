### The aim of the project is to allow the photographer to create photo gallery for each client. Each gallery is visible only to the customer after entering the appropriate password. 
#### If the administrator logs in, he has an option to add photos for a given client. When the client logs in he has preview of his photos.

<br>

![gallery](https://user-images.githubusercontent.com/52113159/101664163-cbbc3700-3a4b-11eb-9aec-6e37bc01be53.gif)

#

## Requirements
This app requires PostgreSQL database installed locally. You can get it here: https://www.postgresql.org/download/  
After installation create database and tables (SQL commands provided in database.sql file), and run PostgreSQL service.

### Environment Variables
Create .env file in the project directory with your database credentials. It shoud look like this:

*DB_USER=*  
*DB_PASSWORD=*  
*DB_HOST=*  
*DB_PORT=*  
*DB_DATABASE=*  
*SESSION_SECRET=*

## To run this app
#### `rm package-lock.json`
#### `npm install`
#### `npm start / yarn start`
