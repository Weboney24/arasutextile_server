const { Schema, model } = require("mongoose");

module.exports = model(
  "admin users",
  Schema(
    {
      profileImg: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
      },
    },
    {
      collection: "admin users",
      timestamps: true,
    }
  )
);
