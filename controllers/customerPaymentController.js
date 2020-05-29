const CustomerPayment = require("../models/customerPaymentModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createCustomerPayment = factory.createOne(CustomerPayment);
exports.getAllCustomerPayments = factory.getAll(CustomerPayment);
exports.getCustomerPayment = factory.getOne(CustomerPayment);
exports.updateCustomerPayment = factory.updateOne(CustomerPayment);
exports.deleteCustomerPayment = factory.deleteOne(CustomerPayment);

exports.totalSales = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    CustomerPayment.aggregate([
      {
        $group: {
          _id: 1,
          totalSales: { $sum: "$paidAmount" },
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
