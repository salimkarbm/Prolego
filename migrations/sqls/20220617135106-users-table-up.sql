/* create users table */
CREATE TABLE users (
  id serial PRIMARY KEY, 
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  password_digest varchar(150) NOT NUll, 
  email varchar(100) NOT NULL UNIQUE,
  roles VARCHAR (100),
  active Boolean NOT NULL default 'true',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  google_id VARCHAR (100),
  passwordResetToken VARCHAR (150));
  