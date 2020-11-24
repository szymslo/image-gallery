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
