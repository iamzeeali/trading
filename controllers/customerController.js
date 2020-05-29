const Customer = require("../models/customerModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createCustomer = factory.createOne(Customer);
exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);

exports.updateReceivable = catchAsync(async (req, res, next) => {
  const { receivable } = req.body;

  let updatedReceivable = receivable;
  try {
    let doc = await Customer.findByIdAndUpdate(req.params.id, {
      $inc: { receivable: updatedReceivable },
    });

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

exports.totalReceivable = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Customer.aggregate([
      {
        $group: {
          _id: 1,
          totalReceivable: { $sum: "$receivable" },
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
