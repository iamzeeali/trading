const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  purchaseDate: {
    type: Date,
    required: [true, "purchase date is required"],
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: "Supplier",
    required: [true, "supplier is required"],
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  uom: {
    type: mongoose.Schema.ObjectId,
    ref: "UOM",
    required: [true, "uom is required"],
  },
  purchasePrice: {
    type: Number,
    required: [true, "purchase price is required"],
  },
  freightCharge: {
    type: Number,
  },
  handlingCharge: {
    type: Number,
  },
  purchasedBy: {
    type: String,
  },
  totalPayable: {
    type: Number,
  },
  advancePayment: {
    type: Number,
  },
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

purchaseSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

purchaseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  })
    .populate({
      path: "company",
      select: "name",
    })
    .populate({
      path: "item",
      select: "name",
    })
    .populate({
      path: "supplier",
      select: "name",
    })
    .populate({
      path: "uom",
      select: "name",
    });
  next();
});

module.exports = Purchase = mongoose.model("Purchase", purchaseSchema);
