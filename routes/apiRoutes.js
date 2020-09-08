// LOAD DATA

var noteArray = require("../db/db.json");

// ROUTING

module.exports = function (app) {
  // API GET Requests

  app.get("/api/notes", function (req, res) {
    res.json(noteArray);
  });
  console.log(noteArray);
  // API POST Requests

  app.post("/api/notes", function (req, res) {
    // - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  });

  app.delete("/api/notes", function (req, res) {
    // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  });
};
