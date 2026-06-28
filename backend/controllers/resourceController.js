import Resource from "../models/Resource.js";
import { createCrudController } from "../utils/crudFactory.js";

const baseController = createCrudController(Resource, {
  searchFields: ["title", "description"],
  filterFields: ["category"],
});

// POST /api/resources/:id/download — increments download counter, used when the user clicks Download
const trackDownload = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    if (!resource) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, data: resource });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const resourceController = { ...baseController, trackDownload };