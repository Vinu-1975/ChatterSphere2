const { 
    allUsers,
    register,
    login, 
} = require('../controller/usersController')
const { protect } = require('../middleware/authMiddleware')
const router = require('express').Router()

router.get('/',protect,allUsers)
router.post("/register",register)
router.post("/login",login)

module.exports = router