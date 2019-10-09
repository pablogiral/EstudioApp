const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    image: {
      type: String,
      default:
        "https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
