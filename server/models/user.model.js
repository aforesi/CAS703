const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    password: { type: String, required: true},
    fingerprint: { type: Boolean, required: true},
    facialscan: { type: Boolean, required: true},
    minpasswordtime: { type: Number, required: true},
    maxpasswordtime: { type: Number, required: true}
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
