import express from "express"
const router = express.Router();
import MainController from "../controllers/mainController.js"

router.get('/home', MainController.GetMainPage)
router.get('/news', MainController.GetNewsPage)

router.route('/myProfile')
    .post(MainController.AddPost)
    .get(MainController.GetPofilePage)

export default router;