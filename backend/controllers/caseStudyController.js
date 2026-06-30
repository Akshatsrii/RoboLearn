const CaseStudy = require("../models/CaseStudy");
const { createCrudController } = require("../utils/crudFactory");

const caseStudyController = createCrudController(CaseStudy, {
  searchFields: ["schoolName", "location"],
  filterFields: ["isPublished"],
});

module.exports = { caseStudyController };