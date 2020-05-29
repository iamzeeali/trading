const express = require("express");
const authController = require("./../controllers/authController");
const supplierPaymentController = require("../controllers/supplierPaymentController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(supplierPaymentController.getAllSupplierPayments)
  .post(supplierPaymentController.createSupplierPayment);

router.route("/totalPurchase").get(supplierPaymentController.totalPurchase);

router
  .route("/:id")
  .get(supplierPaymentController.getSupplierPayment)
  .patch(supplierPaymentController.updateSupplierPayment)
  .delete(
    authController.restrictTo("admin"),
    supplierPaymentController.deleteSupplierPayment
  );

module.exports = router;
