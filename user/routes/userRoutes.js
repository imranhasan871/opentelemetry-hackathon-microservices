const router = require("express").Router();
const  createUserController  = require("../controllers/createUserController");
const getUserByIdController  = require("../controllers/getUserByIdController");
const getAllUsersController  = require("../controllers/getAllUsersController");
const updateUserController  = require("../controllers/updateUserController");
const deleteUserController  = require("../controllers/deleteUserController");

// Create User
router.post("/users", createUserController);

// Get user by id
router.get("/users/:id",getUserByIdController)

// Get User By Email
router.get("/users/email/:email",getUserByIdController)

// Get All Users
router.get("/users",getAllUsersController)

// Update User
router.patch("/users/:id",updateUserController)

// Delete User
router.delete("/users/:id",deleteUserController)

module.exports = router;
