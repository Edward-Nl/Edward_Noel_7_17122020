const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const ComControllers = require('../controllers/Commentaires');

router.get("/:id", auth, ComControllers.allCommentaires);
router.post("/", auth, ComControllers.createCommentaires);
router.delete('/:id', auth, ComControllers.deleteCommentaire);

module.exports = router;