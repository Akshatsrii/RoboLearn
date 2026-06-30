const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const fileUrl = `${process.env.PUBLIC_URL || ""}/uploads/${req.file.filename}`;

  return res.status(201).json({
    success: true,
    data: {
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

module.exports = { uploadFile };