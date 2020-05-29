const express = require("express");
const authController = require("./../controllers/authController");
const uomController = require("./../controllers/uomController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router.route("/").get(uomController.getAllUoms).post(uomController.createUom);

router
  .route("/:id")
  .get(uomController.getUom)
  .patch(uomController.updateUom)
  .delete(authController.restrictTo("admin"), uomController.deleteUom);

module.exports = router;
