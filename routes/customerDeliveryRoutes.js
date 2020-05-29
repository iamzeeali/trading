const express = require("express");
const authController = require("./../controllers/authController");
const customerDeliveryController = require("./../controllers/customerDeliveryController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin", "delivery"));

router
  .route("/")
  .get(customerDeliveryController.getAllCustomerDeliveries)
  .post(customerDeliveryController.createCustomerDelivery);

router
  .route("/:id")
  .get(customerDeliveryController.getCustomerDelivery)
  .patch(customerDeliveryController.updateCustomerDelivery)
  .delete(
    authController.restrictTo("admin"),
    customerDeliveryController.deleteCustomerDelivery
  );

module.exports = router;
