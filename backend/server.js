var express = require("express");
var stylus = require("stylus");
var terser = require("terser");
var app = express();

// Set pug as the view engine
app.set("view engine", "pug");

// Set the "views" folder
app.set("views", __dirname + "/../frontend/views");

// Static assets
app.use(express.static(__dirname + "/../frontend"));

// Pug compile options
pugOptions = {
	filters: {
		stylus: (code) => {
			return stylus.render(code, { compress: true })
		},
		terser: (code) => {
			return terser.minify(code).code
		}
	}
}

// Routes
app.get("/", (req, res) => res.render("index", pugOptions));

// Listens on port 4000
app.listen(4000, () => console.log("sowa listening on port 4000!"));