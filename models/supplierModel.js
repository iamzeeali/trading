const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  name: {
    type: String,
    required: [true, "Please enter supplier name"],
    unique: true,
  },
  phone1: Number,
  phone2: Number,
  email: String,
  address: {
    type: String,
    required: [true, "address Required"],
  },
  contactPerson: {
    type: String,
    required: [true, "Contact Person Required"],
  },
  state: String,
  city: String,
  bank: String,
  accountNo: Number,
  accountHolder: String,
  ifsc: String,
  bankBranch: String,
  photo: String,
  payable: Number,
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

supplierSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

supplierSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "company",
    select: "name",
  });
  next();
});

module.exports = Supplier = mongoose.model("Supplier", supplierSchema);
