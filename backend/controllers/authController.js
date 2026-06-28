const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
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
    return res
      .status(500)
      .json({ success: false, message: err.message });
  }
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
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
    return res
      .status(400)
      .json({ success: false, message: err.message });
  }
};

// POST /api/auth/staff
const createStaffUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
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
    return res
      .status(400)
      .json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  login,
  register,
  getMe,
  createStaffUser,
};