/* Replace with your SQL commands */
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email VARCHAR (100) UNIQUE NOT NULL,
   firstname VARCHAR (100) NOT NULL,
   lastname VARCHAR (100) NOT NULL, 
   password_digest VARCHAR (100) NOT NULL,
   roles VARCHAR (100) CHECK (roles IN ('Admin', 'Teacher', 'Student', 'User' )) Default 'User' NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
)
