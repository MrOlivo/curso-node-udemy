const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/StorageController");
const { validateId, validateFileComes } = require("../validators/storage");
const { upload } = require("../utils/handleStore");

router.get("/", getItems);
router.post("/", validateFileComes, upload.single("file"), createItem);
router.get("/:id", validateId, getItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
