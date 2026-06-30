const Course = require("../models/Course");
const { createCrudController } = require("../utils/crudFactory");

const courseController = createCrudController(Course, {
  searchFields: ["title", "description"],
  filterFields: ["audience", "isActive"],
});

module.exports = { courseController };