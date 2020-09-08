// LOAD DATA

var noteArray = require("../db/db.json");
var fs = require("fs");

// ROUTING

module.exports = function (app) {
  // API GET Requests

  app.get("/api/notes", function (req, res) {
    res.json(noteArray);
  });
  console.log(noteArray);
  // API POST Requests

  app.post("/api/notes", function (req, res) {
    //push the body from the request into array
    noteArray.push(req.body);
    // convert response to JSON and push to noteArray (db.json)...
    res.json(noteArray);
    fs.writeFile(
      "db.json",
      JSON.stringify(noteArray),
      { flags: "a" },
      function (err) {
        if (err) return console.log(err);
      }
    );

    //  receives a new note to save on the request body, adds it to the `db.json` file, and then return the new note to the client in the saved note area section
  });

  app.delete("/api/notes", function (req, res) {
    // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  });
};
