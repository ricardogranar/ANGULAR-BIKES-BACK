const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json("SERVIDOR OK, BIENVENIDXS A CUANDO LAS BICIS MOLABAN");
});

module.exports = router;
