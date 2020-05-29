const express = require("express");
const authController = require("./../controllers/authController");
const cityController = require("./../controllers/cityController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only

router
  .route("/")
  .get(cityController.getAllCities)
  .post(cityController.createCity);

router
  .route("/:id")
  .get(cityController.getCity)
  .patch(cityController.updateCity)
  .delete(authController.restrictTo("admin"), cityController.deleteCity);

module.exports = router;
