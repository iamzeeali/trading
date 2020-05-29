const SupplierPayment = require("../models/supplierPaymentModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createSupplierPayment = factory.createOne(SupplierPayment);
exports.getAllSupplierPayments = factory.getAll(SupplierPayment);
exports.getSupplierPayment = factory.getOne(SupplierPayment);
exports.updateSupplierPayment = factory.updateOne(SupplierPayment);
exports.deleteSupplierPayment = factory.deleteOne(SupplierPayment);

exports.totalPurchase = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    SupplierPayment.aggregate([
      {
        $group: {
          _id: 1,
          totalSales: { $sum: "$receivedAmount" },
        },
      },
    ]),
    req.query
  ).paginate();

  const doc = await features.query;
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
