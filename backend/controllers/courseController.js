const Course = require("../models/Course");
const { createCrudController } = require("../utils/crudFactory");

const courseController = createCrudController(Course, {
  searchFields: ["title", "description"],
  filterFields: ["audience", "isActive"],
});

const proposeCourse = async (req, res) => {
  const { title, audience, level, description, duration, syllabus } = req.body;

  if (!title || !audience || !description) {
    return res.status(400).json({ success: false, message: "Title, audience, and description are required." });
  }

  try {
    const course = await Course.create({
      title,
      audience,
      level: level || "",
      description,
      duration: duration || "",
      syllabus: Array.isArray(syllabus) ? syllabus : (syllabus ? syllabus.split(",").map(s => s.trim()) : []),
      isActive: true, // make active so they see it instantly!
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error("Propose course error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to submit course proposal" });
  }
};

module.exports = { courseController, proposeCourse };