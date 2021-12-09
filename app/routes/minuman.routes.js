module.exports = app => {
  const minumans = require("../controllers/minuman.controller.js");

  // Create a new minuman
  app.post("/minumans", minumans.create);

  // Retrieve all minumans
  app.get("/minumans", minumans.findAll);

  // Retrieve a single minuman with minumanId
  app.get("/minumans/:minumanId", minumans.findOne);

  // Update a minuman with minumanId
  app.put("/minumans/:minumanId", minumans.update);

  // Delete a minuman with minumanId
  app.delete("/minumans/:minumanId", minumans.delete);

  // Create a new minuman
  app.delete("/minumans", minumans.deleteAll);
};