const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/account/:id', auth, userCtrl.getUserProfil);
router.get("/", auth, userCtrl.getAllUsers);
router.put('/account/:id', auth, multer, userCtrl.updateUserProfil);

module.exports = router;