import express from "express"
import { createUrl, deleteUrl, getAllUrls, getUrl } from "../controllers/url.controller";


const router = express.Router()

router.route('/short-url').post(createUrl).get(getAllUrls)
router.route('/short-url/:id').delete(deleteUrl).get(getUrl)

export default router