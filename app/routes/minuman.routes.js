/**
 * @swagger
 * /minumans:
 *   get:
 *     tags: [Minumans]
 *     name: Find minuman
 *     summary: Finds all minuman
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Minumans object
 *       '401':
 *         description: No auth token / no minuman found in db with that name
 *       '403':
 *         description: JWT token and uraianMinuman from client don't match
 * 
 * /minumans/{id}:
 *   get:
 *     summary: gets minumans by id
 *     tags: [Minumans]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of minuman
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: minumans by its id
 *         content:
 *           application/json:
 *       400:
 *         description: minuman can not be found
 * /minumans/{id}/delete:
 *   delete:
 *     summary: remove minumans by id
 *     tags: [Minumans]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of minuman
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: minumans by its id
 *         content:
 *           application/json:
 *       400:
 *         description: minuman can not be found
 * /minumans/add:
 *   post:
 *     summary: add minumans
 *     tags: [Minumans]
 *     parameters:
 *      - in: body
 *        name: minuman
 *        schema:
 *          type: object
 *          required:
 *            - uraian_minuman
 *            - kategori_minuman
 *          properties:
 *            kd_minuman:
 *              type: integer
 *            uraian_minuman:
 *              type: string
 *            kategori_minuman:
 *              type: string
 *     responses:
 *       200:
 *         description: add minumans success
 *         content:
 *           application/json:
 *       400:
 *         description: minuman can not be found
 *       403:
 *         description: bad request
 * /minumans/{id}/update:
 *   put:
 *     summary: update minumans
 *     tags: [Minumans]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      - in: body
 *        name: minuman
 *        schema:
 *          type: object
 *          required:
 *            - uraian_minuman
 *            - kategori_minuman
 *          properties:
 *            kd_minuman:
 *              type: integer
 *            uraian_minuman:
 *              type: string
 *            kategori_minuman:
 *              type: string
 *     responses:
 *       200:
 *         description: update minumans success
 *         content:
 *           application/json:
 *       400:
 *         description: minuman can not be found
 */


module.exports = app => {
  const minumans = require("../controllers/minuman.controller.js");

  // Create a new minuman
  app.post("/minumans/add", minumans.create);

  // Retrieve all minumans
  app.get("/minumans", minumans.findAll);

  // Retrieve a single minuman with minumanId
  app.get("/minumans/:minumanId", minumans.findOne);

  // Update a minuman with minumanId
  app.put("/minumans/:minumanId/update", minumans.update);

  // Delete a minuman with minumanId
  app.delete("/minumans/:minumanId/delete", minumans.delete);

  // delete all minumans
  app.delete("/minumans", minumans.deleteAll);
};