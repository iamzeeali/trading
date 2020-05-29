const express = require("express");
const authController = require("./../controllers/authController");
const supplierController = require("./../controllers/supplierController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(supplierController.getAllSuppliers)
  .post(supplierController.createSupplier);

router.route("/updatePayable/:id").patch(supplierController.updatePayable);
router.route("/totalPayable").get(supplierController.totalPayable);

router
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier)
  .delete(
    authController.restrictTo("admin"),
    supplierController.deleteSupplier
  );

module.exports = router;
