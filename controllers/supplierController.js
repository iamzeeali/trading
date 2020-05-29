const Supplier = require("../models/supplierModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createSupplier = factory.createOne(Supplier);
exports.getAllSuppliers = factory.getAll(Supplier);
exports.getSupplier = factory.getOne(Supplier);
exports.updateSupplier = factory.updateOne(Supplier);
exports.deleteSupplier = factory.deleteOne(Supplier);

exports.updatePayable = catchAsync(async (req, res, next) => {
  const { payable } = req.body;

  let updatedPayable = payable;
  try {
    let doc = await Supplier.findByIdAndUpdate(req.params.id, {
      $inc: { payable: updatedPayable },
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

exports.totalPayable = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Supplier.aggregate([
      {
        $group: {
          _id: 1,
          totalPayable: { $sum: "$payable" },
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
