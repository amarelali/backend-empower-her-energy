const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      minlength: [3, "First Name must be at least 3 characters!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      minlength: [3, "Last Name must be at least 3 characters!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters!"],
      validate: {
        validator: function (value) {
          // Regular expression to match the password rules
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\(\)])[A-Za-z\d@$!%*?&_\(\)]{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
      },
    },
    reenterPassword: {
      type: String,
      required: [true, "Please re-enter your password!"],
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// Custom validation for reenterPassword
userSchema.pre("validate", function (next) {
  if (this.password !== this.reenterPassword) {
    this.invalidate("reenterPassword", "Passwords must match!");
  }
  next();
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.reenterPassword = await bcrypt.hash(this.reenterPassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
