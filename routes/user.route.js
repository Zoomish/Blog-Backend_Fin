import express from 'express'
import { test } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', test)
router.put('/update:userId', test)

export default router
