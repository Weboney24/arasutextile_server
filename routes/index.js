const router = require("express").Router();
const { UploadImage } = require("../controller/shared.controller");
const { upload } = require("../helper/multer.helper");
const { VerfiyToken } = require("../helper/shared.helper");
const { auth_routes, admin_routers, review_routes, blog_routes, mail_routes, enquires_routes } = require("../routes/routes_import");

//Admin EndPoints
router.use("/auth", auth_routes);
router.use("/admin", admin_routers);
router.use("/review", VerfiyToken, review_routes);
router.use("/blog", blog_routes);

//Client EndPoints
router.use("/client_review", review_routes);

//Image Upload EndPoints
router.post("/upload_images", upload.single("image"), UploadImage);

// mail
router.use("/mail", mail_routes);

// help
router.use("/help", enquires_routes);

// section

// cart

//clone

module.exports = router;
