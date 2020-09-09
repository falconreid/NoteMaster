// LOAD DATA

var noteArray = require("../db/db.json");
var fs = require("fs");

// ROUTING

module.exports = function (app) {
  // API GET Requests

  app.get("/api/notes", function (req, res) {
    try {
      noteArray = fs.readFileSync("db.json", "utf-8");
      noteArray = JSON.parse(noteArray);
    } catch (err) {
      console.log(err);
      console.log("\n error in app.post");
    }

    res.json(noteArray);
  });
  console.log(noteArray);
  // API POST Requests

  app.post("/api/notes", function (req, res) {
    // reads JSON file
    noteArray = fs.readFileSync("db.json", "utf-8");
    console.log(noteArray);
    // parses json file
    noteArray = JSON.parse(noteArray);
    //push the body from the request into array, and add id based on length of array
    req.body.id = noteArray.length;

    noteArray.push(req.body);
    // convert response to JSON and push to noteArray (db.json)...
    res.json(noteArray);
    // write to file
    fs.writeFile(
      "db.json",
      JSON.stringify(noteArray),
      // prevents overwriting
      { flags: "a" },
      function (err) {
        if (err) return console.log(err);
      }
    );

    //  receives a new note to save on the request body, adds it to the `db.json` file, and then return the new note to the client in the saved note area section
  });

  // :id makes sure that it deletes based on id
  app.delete("/api/notes/:id", function (req, res) {
    // load and read the json file
    noteArray = fs.readFileSync("db.json", "utf-8");
    // parsing data from file
    noteArray = JSON.parse(noteArray);
    // using filter function to delete unwanted note
    noteArray = noteArray.filter(function (note) {
      // returns notes that don't match the id
      return note.id != req.params.id;
    });
    // stringify to send back to db.json file
    noteArray = JSON.stringify(noteArray);
    // rewrites the file with updated notes
    fs.writeFile("db.json", noteArray, "utf8", function (err) {
      if (err) throw err;
    });
    // parse into array and send to browser
    res.send(JSON.parse(noteArray));
  });
};
