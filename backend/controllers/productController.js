const Product = require("../models/Product");

const generateSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, level, featured, search, page = 1, limit = 12 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    if (featured === "true") query.isFeatured = true;
    if (search) query.name = { $regex: search, $options: "i" };
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, data: products, total, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:slug
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products (admin)
const createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    // Accept imageUrl as a convenience shorthand → convert to images array
    if (body.imageUrl && (!body.images || body.images.length === 0)) {
      body.images = [body.imageUrl];
      delete body.imageUrl;
    }
    if (!body.slug) body.slug = generateSlug(body.name || "product");
    const product = await Product.create(body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/products/:id (admin)
const updateProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.imageUrl && (!body.images || body.images.length === 0)) {
      body.images = [body.imageUrl];
      delete body.imageUrl;
    }
    if (body.name && !body.slug) body.slug = generateSlug(body.name);
    const product = await Product.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: false });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/products/:id (admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
