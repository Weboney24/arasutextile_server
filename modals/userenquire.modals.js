const { Schema, model } = require("mongoose");

module.exports = model(
  "enquires",
  Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    {
      collection: "enquires",
      timestamps: true,
    }
  )
);
