const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  updateItem,
  createItem,
  deleteItem,
} = require("../controllers/TracksController");
const authMiddleware = require("../middleware/AuthMiddleware");
const authRolMiddleware = require("../middleware/RolMiddleware");
const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/tracks");

router.use(authMiddleware);

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post(
  "/",
  authRolMiddleware(["admin"]),
  validateObjectDataCreate,
  createItem
);
router.put("/:id", validateObjectDataUpdate, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
