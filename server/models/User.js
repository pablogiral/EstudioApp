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
        "https://icon-library.net/images/default-user-icon/default-user-icon-14.jpg"
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
