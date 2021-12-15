const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const swaggerDefinition = {
  info: {
    title: 'Learn Node JS API',
    version: '1.0.0',
    description: 'Endpoints to test the minumans routes',
  },
  host: 'localhost:8080',
  basePath: '/',
  // definitions: {
  //   users: {
  //     "type": "object",
  //     "required": [
  //       "username",
  //       "password"
  //     ],
  //     "properties": {
  //       "username": {
  //         "type": "string",
  //         "description": "The email of the user"
  //       },
  //       "password": {
  //         "type": "string",
  //         "description": "The password of the user for figo."
  //       }
  //     }
  //   }
  // }
};

const options = {
  swaggerDefinition,
  apis: ['./app/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/ngomb-minumans-service', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// a route for home page
app.get("/home", (req, res) => {
  res.json({ message: "NodeJs CRUD Application" });
});

require("./app/routes/minuman.routes.js")(app);

// setting port to 3000, & listening for requests http request.
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});