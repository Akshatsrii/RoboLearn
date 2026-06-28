const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ success: false, message: "User not found" });
    next();
  } catch {
    res.status(401).json({ success: false, message: "Token failed" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  res.status(403).json({ success: false, message: "Admin access required" });
};

const editorOrAdmin = (req, res, next) => {
  if (["admin", "editor"].includes(req.user?.role)) return next();
  res.status(403).json({ success: false, message: "Editor or Admin access required" });
};

module.exports = { protect, adminOnly, editorOrAdmin };