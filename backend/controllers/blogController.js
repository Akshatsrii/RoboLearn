const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

const generateSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = {};

    // Check if requester is admin/editor to show drafts as well
    const authHeader = req.headers.authorization;
    let isAdmin = false;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === "admin" || decoded.role === "editor") {
          isAdmin = true;
        }
      } catch (err) {
        // ignore token decode errors for public route
      }
    }

    if (!isAdmin) {
      query.isPublished = true;
    }

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
    const identifier = req.params.slug;
    const isId = mongoose.Types.ObjectId.isValid(identifier);
    let query = isId
      ? { $or: [{ _id: identifier }, { slug: identifier }] }
      : { slug: identifier };

    // Check if requester is admin/editor to allow previewing drafts
    const authHeader = req.headers.authorization;
    let isAdmin = false;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === "admin" || decoded.role === "editor") {
          isAdmin = true;
        }
      } catch (err) {
        // ignore token decode errors
      }
    }

    if (!isAdmin) {
      query.isPublished = true;
    }

    const blog = await Blog.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("author", "name");

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const relatedQuery = {
      category: blog.category,
      _id: { $ne: blog._id },
    };
    if (!isAdmin) {
      relatedQuery.isPublished = true;
    }

    const related = await Blog.find(relatedQuery).limit(3);

    res.json({ success: true, data: blog, related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/blogs (admin)
const createBlog = async (req, res) => {
  try {
    const blogData = { ...req.body, author: req.user.id };
    if (!blogData.slug || !blogData.slug.trim()) {
      blogData.slug = generateSlug(blogData.title);
    } else {
      blogData.slug = generateSlug(blogData.slug);
    }

    if (blogData.isPublished && !blogData.publishedAt) {
      blogData.publishedAt = new Date();
    }

    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/blogs/:id (admin)
const updateBlog = async (req, res) => {
  try {
    if (req.body.isPublished && !req.body.publishedAt) req.body.publishedAt = new Date();
    if (req.body.title && (!req.body.slug || !req.body.slug.trim())) {
      req.body.slug = generateSlug(req.body.title);
    } else if (req.body.slug) {
      req.body.slug = generateSlug(req.body.slug);
    }
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
