import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
console.log("DB_USER =", process.env.DB_USER);
pool.on("connect", () => {
  console.log("DB connected using ENV credentials");
  

});

export default pool;
