import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  NODE_ENV,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
} = process.env;

let client: Pool;

if (NODE_ENV === 'dev') {
  console.log('dev');
  client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string, 10),
  });
} else if (NODE_ENV === 'test') {
  console.log('test');
  client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string, 10),
  });
} else {
  client = new Pool({});
}

export default client;
