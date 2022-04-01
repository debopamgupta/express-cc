const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const members = require("./Members");

const app = express();

// handlebars middleware
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

const membersHandler = require("./routes/api/members");

// homepage route on templating engine
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// body parsing as json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json({
    message: "🚫 API Endpoint. Go Home ",
  });
});

// members api route
app.use("/api/members", membersHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
