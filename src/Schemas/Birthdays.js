const { model, Schema } = require("mongoose");

module.exports = model(
  "TestGeburtstag",
  new Schema({
    Guild: String,
    UserID: String,
    UserName: String,
    BirthdayDate: String,
  })
);
