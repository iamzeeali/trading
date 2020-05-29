const mongoose = require("mongoose");

const customerPaymentSchema = new mongoose.Schema({
  customerDelivery: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer_Delivery",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  paymentDate: {
    type: Date,
    required: [true, "payment date is required"],
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: [true, "customer is required"],
  },
  paymentMode: {
    type: String,
  },
  receivedAmount: {
    type: Number,
  },
  balanceAmount: {
    type: Number,
  },
  receivedBy: {
    type: String,
  },
  paidBy: {
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

customerPaymentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

customerPaymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  })
    .populate({
      path: "company",
      select: "name",
    })
    .populate({
      path: "customer",
      select: "name",
    });
  next();
});

module.exports = customerPayment = mongoose.model(
  "customerPayment",
  customerPaymentSchema
);
