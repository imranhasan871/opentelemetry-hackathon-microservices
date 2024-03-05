const router = require("express").Router();

const signINController = require("../controllers/signInController");
const signUpController = require("../controllers/signUpController");
const checkPointController = require("../controllers/checkPointController");
const updateCrendentialController = require("../controllers/updateCrendentialController");
const emailVerificationController = require("../controllers/emailVerificationController");
const getAuthUserController = require("../controllers/getAuthUserController");
router.post("/signup", signUpController);

router.post("/signin", signINController);

// admin can change user role
router.patch("/crendential/roles/:email", updateCrendentialController);

// Email Verification
router.post("/verification", emailVerificationController);

router.post("/checkpoint", checkPointController);

router.get("/auth/users/:userId",getAuthUserController)
module.exports = router;


