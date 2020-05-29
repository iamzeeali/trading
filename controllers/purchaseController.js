const Purchase = require("../models/purchaseModel");
const factory = require("./handlerFactory");

exports.createPurchase = factory.createOne(Purchase);
exports.getAllPurchases = factory.getAll(Purchase);
exports.getPurchase = factory.getOne(Purchase);
exports.updatePurchase = factory.updateOne(Purchase);
exports.deletePurchase = factory.deleteOne(Purchase);
