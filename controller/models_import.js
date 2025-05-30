const AdminUsers = require("../modals/adminusers.modals");
const reviewModals = require("../modals/review.modals");
const blogMoidals = require("../modals/blog.moidals");
const resetPasswordModals = require("../modals/resetPassword.modals");
const userenquireModals = require("../modals/userenquire.modals");

module.exports = {
  AdminUsersSchema: AdminUsers,
  ReviewSchemas: reviewModals,
  BlogSchema: blogMoidals,
  ResetPasswordSchema: resetPasswordModals,
  EnquiresSchema: userenquireModals,
};
