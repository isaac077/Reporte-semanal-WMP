"use strict";

// api/test.ts
module.exports = (req, res) => {
  res.status(200).json({ status: "ok", test: "cjs handler works" });
};
