/**
 * Generic CRUD factory.
 * Pass a Mongoose model and get back standard REST handlers:
 *   getAll, getOne, create, update, remove
 *
 * Usage:
 *   import { createCrudController } from "../utils/crudFactory.js";
 *   import Product from "../models/Product.js";
 *   export const productController = createCrudController(Product, {
 *     searchFields: ["name", "description"],
 *     filterFields: ["category", "level"],
 *   });
 */
export function createCrudController(Model, options = {}) {
  const { searchFields = [], filterFields = [], defaultSort = "-createdAt" } = options;

  // GET /resource?page=1&limit=12&search=...&category=...
  const getAll = async (req, res) => {
    try {
      const { page = 1, limit = 12, search, sort } = req.query;
      const query = {};

      // Exact-match filters (e.g. ?category=Beginner)
      filterFields.forEach((field) => {
        if (req.query[field]) query[field] = req.query[field];
      });

      // Text search across configured fields (e.g. ?search=arduino)
      if (search && searchFields.length > 0) {
        query.$or = searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        }));
      }

      const pageNum = Math.max(parseInt(page, 10) || 1, 1);
      const limitNum = Math.min(parseInt(limit, 10) || 12, 100);

      const [data, total] = await Promise.all([
        Model.find(query)
          .sort(sort || defaultSort)
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum),
        Model.countDocuments(query),
      ]);

      return res.json({
        success: true,
        data,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // GET /resource/:id
  const getOne = async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: "Not found" });
      return res.json({ success: true, data: doc });
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
  };

  // POST /resource
  const create = async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      return res.status(201).json({ success: true, data: doc });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  // PUT /resource/:id
  const update = async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ success: false, message: "Not found" });
      return res.json({ success: true, data: doc });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  // DELETE /resource/:id
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

/**
 * Generic CRUD route factory — wires the handlers above onto an Express router.
 * Pass `protect`/`adminOnly` middleware if write routes should be restricted.
 *
 * Usage:
 *   import { createCrudRouter } from "../utils/crudFactory.js";
 *   const router = createCrudRouter(productController, { protectWrites: [protect, adminOnly] });
 */
export function createCrudRouter(controller, { router, protectWrites = [] } = {}) {
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", ...protectWrites, controller.create);
  router.put("/:id", ...protectWrites, controller.update);
  router.delete("/:id", ...protectWrites, controller.remove);
  return router;
}