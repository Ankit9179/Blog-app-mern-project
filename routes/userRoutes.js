const express = require("express");
const {
  registerController,
  getAllUserController,
  loginUserController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//create user/ register routes || POST
router.post("/register", registerController);

//get all user  || get
router.get("/all-user", getAllUserController);

//login user || POST
router.post("/login", loginUserController);

module.exports = router;
