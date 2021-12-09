const Minuman = require("../models/minumans.model.js");

// Create and Save a new minuman
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Minuman
  const minuman = new Minuman({
    uraian_minuman: req.body.uraian_minuman,
    kategori_minuman: req.body.kategori_minuman,
  });

  // Save Minuman in the database
  Minuman.create(minuman, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Minuman."
      });
    else res.send(data);
  });
};

// Retrieve all minumans from the database.
exports.findAll = (req, res) => {
  Minuman.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving minumans."
      });
    else res.send(data);
  });
};

// Find a single minuman with a minumanId
exports.findOne = (req, res) => {
  Minuman.findById(req.params.minumanId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Minuman with kd_minuman ${req.params.minumanId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Minuman with kd_minumanF " + req.params.minumanId
        });
      }
    } else res.send(data);
  });
};

// Update an minuman identified by the minumanId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Minuman.updateById(
    req.params.minumanId,
    new Minuman(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Minuman with id ${req.params.minumanId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Minuman with id " + req.params.minumanId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an minuman with the specified minumanId in the request
exports.delete = (req, res) => {
  Minuman.remove(req.params.minumanId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Minuman with id ${req.params.minumanId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Minuman with id " + req.params.minumanId
        });
      }
    } else res.send({ message: `Minuman was deleted successfully!` });
  });
};

// Delete all minumans from the database.
exports.deleteAll = (req, res) => {
  Minuman.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all minumans."
      });
    else res.send({ message: `All Minumans were deleted successfully!` });
  });

};