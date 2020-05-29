const express = require("express");
const authController = require("./../controllers/authController");
const customerEnquiryController = require("./../controllers/customerEnquiryController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin", "sales"));

router
  .route("/")
  .get(customerEnquiryController.getAllCustomerEnquiries)
  .post(customerEnquiryController.createCustomerEnquiry);

router
  .route("/:id")
  .get(customerEnquiryController.getCustomerEnquiry)
  .patch(customerEnquiryController.updateCustomerEnquiry)
  .delete(
    authController.restrictTo("admin"),
    customerEnquiryController.deleteCustomerEnquiry
  );

module.exports = router;
