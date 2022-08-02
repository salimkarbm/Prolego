import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  NODE_ENV,
  Database,
  User,
  Host,
  DATABASE_PORT,
  POSTGRES_TEST_DB,
  Password,
  DATABASE_URL,
} = process.env;

let client: Pool;
if (NODE_ENV === 'production') {
  const connectionString = DATABASE_URL;
  client = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else if (NODE_ENV === 'development') {
  client = new Pool({
    host: Host,
    user: User,
    database: Database,
    password: Password,
    port: parseInt(DATABASE_PORT as string, 10),
  });
} else {
  client = new Pool({
    host: Host,
    user: User,
    database: POSTGRES_TEST_DB,
    password: Password,
    port: parseInt(DATABASE_PORT as string, 10),
  });
}

// Listen for server connections
export default {
  client,
  Database,
  User,
  Host,
  DATABASE_PORT,
  POSTGRES_TEST_DB,
  Password,
};
