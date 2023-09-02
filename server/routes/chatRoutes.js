const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controller/chatController')
const multer = require('multer')
const router = express.Router()

const upload = multer({storage:multer.memoryStorage()})

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
router.route('/group').post(protect,upload.single('groupAvatarImage'),createGroupChat)
router.route('/rename').put(protect,renameGroup)
router.route('/groupadd').put(protect,addToGroup)
router.route('/groupremove').put(protect,removeFromGroup)

module.exports = router