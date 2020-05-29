const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter company name!"],
    unique: true,
  },
  state: String,
  city: String,
  address: String,
  phone: String,
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: false,
  },
  contactPerson: String,
  photo: String,
  description: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

companySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Company = mongoose.model("Company", companySchema);
