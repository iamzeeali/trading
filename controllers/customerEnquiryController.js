const CustomerEnquiry = require("../models/customerEnquiryModel");
const factory = require("./handlerFactory");

exports.createCustomerEnquiry = factory.createOne(CustomerEnquiry);
exports.getAllCustomerEnquiries = factory.getAll(CustomerEnquiry);
exports.getCustomerEnquiry = factory.getOne(CustomerEnquiry);
exports.updateCustomerEnquiry = factory.updateOne(CustomerEnquiry);
exports.deleteCustomerEnquiry = factory.deleteOne(CustomerEnquiry);
