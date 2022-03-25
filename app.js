require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySQL } = require("./config/mysql");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const engine = process.env.DB_ENGINE || null;
const port = process.env.PORT || 3000;

/**
 * API Rest
 */
app.use("/api", require("./routes"));

app.listen(port, () =>
  console.log(`Server is ready on port ${port}`)
);

/**
 * Define your database engine
 */

if (engine === "mysql") {
  dbConnectMySQL();
}
if (engine === "nosql") {
  dbConnectNoSql();
}
