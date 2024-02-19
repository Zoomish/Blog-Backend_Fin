import express from 'express';

const router = express.Router();

router.post('/signup', signup);
router.get('/login', loginForm);

export default router