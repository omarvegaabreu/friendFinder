/***Dependencies */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

/**Express middleware */
const app = express();
const PORT = process.env.PORT || 3000;

/**Body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

/**Routes */
app.use(express.static("app/public"));

/**Require routes */
require("./app/routing/api-routes")(app);
require("./app/routing/html-routes")(app);

/***If correct will log /listening on port 3000 */
app.listen(PORT, () => console.log(`Listening on PORT, ${PORT}`));
