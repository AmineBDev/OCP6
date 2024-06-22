const router = require("express").Router();
const bookController = require("../controllers/book.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", bookController.readBook);
router.get("/:id", bookController.readOneBook);
router.post("/", auth, bookController.createBook);
router.put("/:id", auth, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
