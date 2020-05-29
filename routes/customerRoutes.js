const express = require("express");
const authController = require("./../controllers/authController");
const customerController = require("./../controllers/customerController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route("/updateReceivable/:id")
  .patch(customerController.updateReceivable);
router.route("/totalReceivable").get(customerController.totalReceivable);

router
  .route("/:id")
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(
    authController.restrictTo("admin"),
    customerController.deleteCustomer
  );

module.exports = router;
