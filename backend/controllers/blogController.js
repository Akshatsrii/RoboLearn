const Blog = require("../models/Blog");

// GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate("author", "name")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, data: blogs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blogs/:slug
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("author", "name");

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const related = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      isPublished: true,
    }).limit(3);

    res.json({ success: true, data: blog, related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/blogs (admin)
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/blogs/:id (admin)
const updateBlog = async (req, res) => {
  try {
    if (req.body.isPublished && !req.body.publishedAt) req.body.publishedAt = new Date();
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/blogs/:id (admin)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };