import { Router } from "express"
import authRoute from "./auth.route"
import userRoute from "./user.route"
import { userGuard } from "../middlewares/role/user.guard"

const router = Router()

router.use('/auth', authRoute)
router.use('/me', userGuard, userRoute)


export default router
