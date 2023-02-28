const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ContactSchema = new Schema({
  firstName: { type: String, required: true  },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, "Phone Number must have 10 digits"],
    maxLength: [10, "Phone Number must have 10 digits"],
  },
});

const Contactdata = mongoose.model("contacts", ContactSchema);
module.exports = Contactdata;
