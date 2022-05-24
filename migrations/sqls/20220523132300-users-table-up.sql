/* Replace with your SQL commands */
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email VARCHAR (100) NOT NULL,
   firstname VARCHAR (100) NOT NULL,
   lastname VARCHAR (100) NOT NULL, 
   password VARCHAR (100)
)