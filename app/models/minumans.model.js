const sql = require("./db.js");

// constructor
const Minuman = function (minuman) {
  this.uraian_minuman = minuman.uraian_minuman;
  this.kategori_minuman = minuman.kategori_minuman;
};

Minuman.create = (newMinuman, result) => {
  sql.query("INSERT INTO minumans SET ?", newMinuman, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created minuman: ", { id: res.insertId, ...newMinuman });
    result(null, { id: res.insertId, ...newMinuman });
  });
};

Minuman.findById = (minumanId, result) => {
  sql.query(`SELECT * FROM minumans WHERE kd_minuman = ${minumanId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found minuman: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found minuman with the id
    result({ kind: "not_found" }, null);
  });
};


Minuman.getAll = result => {
  sql.query("SELECT * FROM minumans", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("minumans: ", res);
    result(null, res);
  });
};

Minuman.updateById = (id, minuman, result) => {
  sql.query(
    "UPDATE minumans SET uraian_minuman = ?, kategori_minuman = ? WHERE kd_minuman = ?",
    [minuman.uraian_minuman, minuman.kategori_minuman, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found minuman with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated minuman: ", { id: id, ...minuman });
      result(null, { id: id, ...minuman });
    }
  );
};

Minuman.remove = (id, result) => {
  sql.query("DELETE FROM minumans WHERE kd_minuman = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found minuman with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted minuman with kd_minuman: ", id);
    result(null, res);
  });
};

Minuman.removeAll = result => {
  sql.query("DELETE FROM minumans", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} minumans`);
    result(null, res);
  });
};

module.exports = Minuman;