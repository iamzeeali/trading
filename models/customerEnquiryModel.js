const mongoose = require("mongoose");

const customerEnquirySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  date: {
    type: Date,
    required: [true, "delivery date is required"],
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: [true, "customer is required"],
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
  },
  uom: {
    type: mongoose.Schema.ObjectId,
    ref: "UOM",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  requiredDate: {
    type: Date,
    required: [true, "required date is required"],
  },
  description: {
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

customerEnquirySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

customerEnquirySchema.pre(/^find/, function (next) {
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
      path: "customer",
      select: "name",
    })
    .populate({
      path: "uom",
      select: "name",
    });
  next();
});

module.exports = customerEnquiry = mongoose.model(
  "customerEnquiry",
  customerEnquirySchema
);
