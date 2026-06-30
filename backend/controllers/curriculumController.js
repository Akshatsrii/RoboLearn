const Curriculum = require("../models/Curriculum");
const { createCrudController } = require("../utils/crudFactory");

const curriculumController = createCrudController(Curriculum, {
  searchFields: ["title", "gradeLabel"],
  defaultSort: "order",
});

module.exports = { curriculumController };