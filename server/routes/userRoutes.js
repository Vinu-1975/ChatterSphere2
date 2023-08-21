const { 
    allUsers,
    register,
    login, 
} = require('../controller/usersController')
const { protect } = require('../middleware/authMiddleware')
const router = require('express').Router()
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})

router.get('/',protect,allUsers)
router.post('/register',upload.single('avatarImage'),register)
router.post("/login",login)

module.exports = router