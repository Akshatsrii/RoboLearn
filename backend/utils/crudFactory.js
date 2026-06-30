function createCrudController(Model, options = {}) {
  const { searchFields = [], filterFields = [], defaultSort = "-createdAt" } = options;

  const getAll = async (req, res) => {
    try {
      const { page = 1, limit = 12, search, sort } = req.query;
      const query = {};

      filterFields.forEach((field) => {
        if (req.query[field] !== undefined) query[field] = req.query[field];
      });

      if (search && searchFields.length > 0) {
        query.$or = searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        }));
      }

      const pageNum = Math.max(parseInt(page, 10) || 1, 1);
      const limitNum = Math.min(parseInt(limit, 10) || 12, 100);

      const [data, total] = await Promise.all([
        Model.find(query).sort(sort || defaultSort).skip((pageNum - 1) * limitNum).limit(limitNum),
        Model.countDocuments(query),
      ]);

      return res.json({
        success: true,
        data,
        pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  const getOne = async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: "Not found" });
      return res.json({ success: true, data: doc });
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
  };

  const create = async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      return res.status(201).json({ success: true, data: doc });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  const update = async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ success: false, message: "Not found" });
      return res.json({ success: true, data: doc });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: "Not found" });
      return res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
  };

  return { getAll, getOne, create, update, remove };
}

function createCrudRouter(controller, { router, protectWrites = [] } = {}) {
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", ...protectWrites, controller.create);
  router.put("/:id", ...protectWrites, controller.update);
  router.delete("/:id", ...protectWrites, controller.remove);
  return router;
}

module.exports = { createCrudController, createCrudRouter };