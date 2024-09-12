const mongoose = require("mongoose");
const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["super-admin", "admin", "operator", "member", "mentor"],
      default: "super-admin",
    },
  },
  { timestamps: true }
);

const RoleModel = mongoose.model("Role", roleSchema);

module.exports = RoleModel;
