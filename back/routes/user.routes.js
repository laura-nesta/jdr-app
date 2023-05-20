const express = require("express");
const router = express.Router();
const {
  setUser,
  getUsers,
  editUser,
  deleteUser,
  getUser,
} = require("../controllers/user.controler");
const { signUp, signIn, logout } = require("../controllers/auth.controler");

// Auth
router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

// User DB
router.get("/", getUsers);
router.post("/", setUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/:pseudo", getUser);

module.exports = router;
