const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
    required: [true, "Please enter customer name"],
    unique: true,
  },
  phone1: Number,
  phone2: Number,
  email: String,
  address: {
    type: String,
    required: [true, "Address Required"],
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
  receivable: Number,
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

customerSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

customerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "company",
    select: "name",
  });
  next();
});

module.exports = Customer = mongoose.model("Customer", customerSchema);
