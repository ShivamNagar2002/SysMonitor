const express = require("express")
const routes =  require("./routes/main.routes")

app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(routes);
module.exports  = app ;