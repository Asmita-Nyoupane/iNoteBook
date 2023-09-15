const connectToMongo = require("./db");
const express = require("express");
const app = express();
connectToMongo();
const port = 5000;
//middleware
app.use(express.json());
//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost: ${port}`);
});
