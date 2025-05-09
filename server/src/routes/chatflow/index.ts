import express from 'express'
import chatflowController from '../../controller/chatflow'
const router = express.Router()

// CREATE
router.post('/', chatflowController.createChatflow)

// READ
router.get('/', chatflowController.getAllChatflows)
router.get(['/', '/:id'], chatflowController.getChatflowById)

// UPDATE
router.put(['/', '/:id'], chatflowController.updateChatflow)

// DELETE
router.delete(['/', '/:id'], chatflowController.deleteChatflow)

export default router
