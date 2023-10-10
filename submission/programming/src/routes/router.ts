import { Router } from "express"
import authRoute from "./auth.route"
import userRoute from "./user.route"
import { roleGuard } from "../middlewares/role/role.guard"
import adminRoute from "./admin.route"

const router = Router()

router.use('/auth', authRoute)
router.use('/me', roleGuard("user"), userRoute)

router.use('/admin', roleGuard("admin"), adminRoute)


export default router
