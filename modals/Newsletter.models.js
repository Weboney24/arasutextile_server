const { Schema, model } = require("mongoose");

const newsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  {
    collection: "newsletters", 
    timestamps: true,
  }
);

module.exports = model("Newsletter", newsletterSchema);
