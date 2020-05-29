const mongoose = require("mongoose");

const customerDeliverySchema = new mongoose.Schema({
  customerEnquiry: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer_Enquiry",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  deliveryDate: {
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
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  uom: {
    type: mongoose.Schema.ObjectId,
    ref: "UOM",
    required: [true, "uom is required"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "selling price is required"],
  },

  agreedPayDate: {
    type: Date,
  },
  deliveredBy: {
    type: String,
  },
  receivedBy: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

customerDeliverySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

customerDeliverySchema.pre(/^find/, function (next) {
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

module.exports = customerDelivery = mongoose.model(
  "customerDelivery",
  customerDeliverySchema
);
