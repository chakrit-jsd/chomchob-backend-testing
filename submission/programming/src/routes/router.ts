import { Router } from "express"
import authRoute from "./auth.route"
import userRoute from "./user.route"
import { roleGuard } from "../middlewares/role/role.guard"
import adminRoute from "./admin.route"
import exchangeRoute from "./exchange.route"

const router = Router()

router.use('/auth', authRoute)
router.use('/me', roleGuard("user"), userRoute)

router.use('/admin', roleGuard("admin"), adminRoute)

router.use('/exchange', exchangeRoute)


export default router
