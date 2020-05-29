const mongoose = require("mongoose");

const uomSchema = new mongoose.Schema({
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
    required: [true, "Please enter item name"],
    unique: true,
  },
  size: {
    type: String,
  },
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

uomSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

uomSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  })
    .populate({
      path: "company",
      select: "name",
    })
    .populate({
      path: "uom",
      select: "name",
    });
  next();
});

module.exports = UOM = mongoose.model("UOM", uomSchema);
