const Partner = require("../models/Partner");
const { createCrudController } = require("../utils/crudFactory");

const partnerController = createCrudController(Partner, {
  searchFields: ["schoolName", "city"],
  filterFields: ["isActive"],
});

module.exports = { partnerController };
