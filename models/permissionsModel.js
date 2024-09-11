const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema(
  {
    permission_name: {
      type: String,
      required: [true, "Permission Name is required!"],
    },
  },
  { timestamps: true }
);

const permissionModel = mongoose.model("Permission", permissionSchema);

module.exports = permissionModel;
