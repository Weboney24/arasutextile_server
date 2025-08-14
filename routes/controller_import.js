const { login, changePasswrod, checkloginstatus } = require("../controller/auth.controller");
const { addAdmin, getAdmin, deleteAdmin, updateAdmin } = require("../controller/admin.controller");
const { clientLogin, clientSignup, clientCheckloginstatus, getAllClientUsers, updateClientUser, deleteClientUser, getSingleClient, addtoHistory } = require("../controller/user.controller");
const { addReview, getreveiewbyproduct, getmyreviewall, getadminsideReview, deleteMyReview, updateMyReview } = require("../controller/review.controller");
const { addblog, getblog, editblog, deleteblog } = require("../controller/blog.controller");
const { sendForgetPasswordMail, resetPassword, verfiyLink, craeteOrderId } = require("../controller/mail.controller");
const { addenquires, getenquires, getsinglnquires, addNewEmail, sendVouter } = require("../controller/enquires.controllers");

module.exports = {
  login,
  changePasswrod,
  checkloginstatus,

  //admin users
  addAdmin,
  getAdmin,
  deleteAdmin,
  updateAdmin,

  // user
  clientLogin,
  clientSignup,
  clientCheckloginstatus,
  getAllClientUsers,
  deleteClientUser,
  updateClientUser,
  getSingleClient,
  addtoHistory,

  //review
  addReview,
  getreveiewbyproduct,
  getmyreviewall,
  getadminsideReview,
  deleteMyReview,
  updateMyReview,

  //blog
  addblog,
  getblog,
  editblog,
  deleteblog,

  // mail
  sendForgetPasswordMail,
  craeteOrderId,
  verfiyLink,
  resetPassword,
  sendVouter,

  //enquires
  addenquires,
  getenquires,
  getsinglnquires,
  addNewEmail,
};
