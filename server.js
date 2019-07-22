const express = require("express");
const stylus = require("stylus");
const terser = require("terser");
const path = require("path");
const app = express();

// Set pug as the view engine
app.set("view engine", "pug");

// Set the "views" folder
app.set("views", __dirname);

// Static assets
app.use(express.static(__dirname));

// Allows pug to use absolute paths
app.locals.basedir = path.join(__dirname);

// Pug compile options
pugOptions = {
	filters: {
		styl: code => {
			return stylus.render(code, { compress: true });
		},
		js: code => {
			return terser.minify(code).code;
		}
	}
};

// Routes
app.get("/", (req, res) => res.render("index", pugOptions))

// Listens on port 4000
app.listen(4000, () => console.log("sowa listening on port 4000!"));