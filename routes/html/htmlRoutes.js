// Import the necessary modules
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/products", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/products.html"));
});

module.exports = router;