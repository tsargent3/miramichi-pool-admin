const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));
var corsOptions = {
  origin: "https://localhost:4001"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Handle CORS + middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
require("./app/routes/user.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin Miramichi Pool server is running on port ${PORT}.`);
});
