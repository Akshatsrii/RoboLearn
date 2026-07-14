const Certificate = require("../models/Certificate");

exports.verifyCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certId: req.params.certId.toUpperCase() });
    if (!cert) return res.status(404).json({ success: false, message: "Certificate not found" });
    res.json({ success: true, certificate: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.json({ success: true, certificate: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
