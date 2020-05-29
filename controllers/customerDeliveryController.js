const CustomerDelivery = require("../models/customerDeliveryModel");
const factory = require("./handlerFactory");

exports.createCustomerDelivery = factory.createOne(CustomerDelivery);
exports.getAllCustomerDeliveries = factory.getAll(CustomerDelivery);
exports.getCustomerDelivery = factory.getOne(CustomerDelivery);
exports.updateCustomerDelivery = factory.updateOne(CustomerDelivery);
exports.deleteCustomerDelivery = factory.deleteOne(CustomerDelivery);
