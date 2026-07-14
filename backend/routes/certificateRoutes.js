const express = require("express");
const router = express.Router();
const { verifyCertificate, createCertificate, getAllCertificates } = require("../controllers/certificateController");

router.get("/verify/:certId", verifyCertificate);
router.post("/", createCertificate);
router.get("/", getAllCertificates);

module.exports = router;
