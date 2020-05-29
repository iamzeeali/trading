const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
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
  uom: {
    type: mongoose.Schema.ObjectId,
    ref: "UOM",
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
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

ItemSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

ItemSchema.pre(/^find/, function (next) {
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

module.exports = Item = mongoose.model("Item", ItemSchema);
