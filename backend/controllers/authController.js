const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = signToken(user);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    console.log("========== REGISTER ==========");
    console.log("BODY:", req.body);
    console.log("ENV ADMIN_SIGNUP_CODE:", process.env.ADMIN_SIGNUP_CODE);

    const { name, email, password, adminCode } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    let role = "user";

    if (adminCode) {
      console.log("Received Admin Code:", adminCode);

      if (
        !process.env.ADMIN_SIGNUP_CODE ||
        adminCode.trim() !== process.env.ADMIN_SIGNUP_CODE.trim()
      ) {
        return res.status(403).json({
          success: false,
          message: "Invalid admin invite code",
        });
      }

      role = "admin";
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = signToken(user);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMe = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

const createStaffUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "editor",
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  login,
  register,
  getMe,
  createStaffUser,
};