const router = require("express").Router();
const bookController = require("../controllers/book.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer-middleware");

router.get("/", bookController.readBook);
router.get("/bestrating", bookController.readBestRatedBooks);
router.get("/:id", bookController.readOneBook);
router.post("/", auth, multer, bookController.createBook);
router.post("/:id/rating", auth, bookController.addRating);
router.put("/:id", auth, multer, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
