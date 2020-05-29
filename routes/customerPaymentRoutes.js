const express = require("express");
const authController = require("./../controllers/authController");
const customerPaymentController = require("./../controllers/customerPaymentController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(customerPaymentController.getAllCustomerPayments)
  .post(customerPaymentController.createCustomerPayment);

router.route("/totalSales").get(customerPaymentController.totalSales);

router
  .route("/:id")
  .get(customerPaymentController.getCustomerPayment)
  .patch(customerPaymentController.updateCustomerPayment)
  .delete(
    authController.restrictTo("admin"),
    customerPaymentController.deleteCustomerPayment
  );

module.exports = router;
