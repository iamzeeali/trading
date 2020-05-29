const Uom = require("../models/uomModel");
const factory = require("./handlerFactory");

exports.createUom = factory.createOne(Uom);
exports.getAllUoms = factory.getAll(Uom);
exports.getUom = factory.getOne(Uom);
exports.updateUom = factory.updateOne(Uom);
exports.deleteUom = factory.deleteOne(Uom);
