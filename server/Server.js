const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./src/Router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
