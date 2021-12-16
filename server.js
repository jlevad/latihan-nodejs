const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const app = express();
global.__basedir = __dirname;

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// swagger
const swaggerDefinition = {
  info: {
    title: 'Ngomb Service API',
    version: '1.0.0',
    description: 'Endpoints to test the minumans routes',
  },
  host: 'localhost:3000',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./app/routes/*.js']
}
const swaggerSpec = swaggerJsdoc(options);

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/ngomb-minumans-service', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// a route for home page
app.get("/home", (req, res) => {
  res.json({ message: "NodeJs CRUD Application" });
});

require("./app/routes/minuman.routes.js")(app);

const initRoutes = require("./app/routes/file-upload.routes.js");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// setting port to 3000, & listening for requests http request.
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});