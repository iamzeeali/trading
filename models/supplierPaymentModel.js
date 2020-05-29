const mongoose = require("mongoose");

const supplierPaymentSchema = new mongoose.Schema({
  purchase: {
    type: mongoose.Schema.ObjectId,
    ref: "Purchase",
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
    required: [true, "supplier payment is required"],
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: "Supplier",
    required: [true, "supplier is required"],
  },
  paymentMode: {
    type: String,
  },
  paidAmount: {
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

supplierPaymentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

supplierPaymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  })
    .populate({
      path: "company",
      select: "name",
    })
    .populate({
      path: "supplier",
      select: "name",
    });
  next();
});

module.exports = SupplierPayment = mongoose.model(
  "SupplierPayment",
  supplierPaymentSchema
);
