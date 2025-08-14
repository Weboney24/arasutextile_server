const { upload } = require("../helper/multer.helper");
const { sendForgetPasswordMail, resetPassword, verfiyLink, craeteOrderId, addNewEmail, sendVouter } = require("./controller_import");

const router = require("express").Router();

router.post("/send_forgetpassoword_mail", sendForgetPasswordMail);
router.post("/reset_password", resetPassword);

router.get("/verfiy_link/:id", verfiyLink);

router.post("/order_id", craeteOrderId);

router.post("/newEmail", addNewEmail);

router.post("/newVouter", upload.single("attachments"), sendVouter);

module.exports = router;
