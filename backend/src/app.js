const express = require("express");
const cors = require("cors");

const enhanceRoutes = require("./routes/enhanceRoutes");
const promptRoutes = require("./routes/promptRoutes");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api", enhanceRoutes);

app.use("/api", promptRoutes);

module.exports = app;