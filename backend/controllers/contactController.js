const Contact = require("../models/Contact");

// POST /api/contact
const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "Your inquiry has been received! We'll contact you within 24 hours.", data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/contact (admin)
const getContacts = async (req, res) => {
  try {
    const { status, type, search, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { schoolName: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, data: contacts, total, pagination: { total, page: Number(page) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/contact/:id/status (admin)
const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/contact/:id (admin)
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };
