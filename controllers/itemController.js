const Item = require("../models/itemModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createItem = factory.createOne(Item);
exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);

exports.updateItemQty = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  let newQty = quantity;
  try {
    let doc = await Item.findByIdAndUpdate(req.params.id, {
      $inc: { quantity: newQty },
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
