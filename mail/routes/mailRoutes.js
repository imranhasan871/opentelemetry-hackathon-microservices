const router = require("express").Router();
const sendEmailController = require("../controllers/sendEmailController");
const getAllMailController = require("../controllers/getAllMailController");


router.post("/mails/send", sendEmailController)

router.get("/mails", getAllMailController)



module.exports = router;
