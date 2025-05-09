import express from 'express'
import agentController from '../../controller/agent'
const router = express.Router()

// CREATE
router.post('/', agentController.createAgent)

// READ
router.get('/', agentController.getAllAgents)
router.get(['/', '/:id'], agentController.getAgentById)

// UPDATE
router.put(['/', '/:id'], agentController.updateAgent)

// DELETE
router.delete(['/', '/:id'], agentController.deleteAgent)

export default router
