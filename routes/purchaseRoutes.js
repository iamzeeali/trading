const express = require("express");
const authController = require("./../controllers/authController");
const purchaseController = require("./../controllers/purchaseController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(purchaseController.getAllPurchases)
  .post(purchaseController.createPurchase);

router
  .route("/:id")
  .get(purchaseController.getPurchase)
  .patch(purchaseController.updatePurchase)
  .delete(
    authController.restrictTo("admin"),
    purchaseController.deletePurchase
  );

module.exports = router;
