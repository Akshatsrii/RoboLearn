const Testimonial = require("../models/Testimonial");
const { createCrudController } = require("../utils/crudFactory");

const baseController = createCrudController(Testimonial, {
  filterFields: ["isFeatured", "isApproved"],
});

const getPublic = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort("-createdAt").limit(12);
    return res.json({ success: true, data: testimonials });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { testimonialController: { ...baseController, getPublic } };