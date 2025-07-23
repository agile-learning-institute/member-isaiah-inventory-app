require('dotenv').config();
const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

client.connect();

client.query(`SELECT * FROM users`, (error, result) => {
  if(!error) {
    console.log(result.rows);
  } else {
    console.log(error.message);
  }
  client.end();
});