import CaseStudy from "../models/CaseStudy.js";
import { createCrudController } from "../utils/crudFactory.js";

export const caseStudyController = createCrudController(CaseStudy, {
  searchFields: ["schoolName", "location"],
  filterFields: ["isPublished"],
});
