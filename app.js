require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectMongoDB = require("./config/mongo");

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const engine = process.env.DB_ENGINE || null;
const port = process.env.PORT || 3000;

//* Routes for API
app.use("/api", require("./routes"));

app.listen(port, () => console.log(`Server is ready on port ${port}`));

//* Define database engine
dbConnectMongoDB();
