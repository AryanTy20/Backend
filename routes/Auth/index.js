import { Router } from "express";
const router = Router();
import { authController } from "../../controller";

router.get("/login", authController.login);
router.post("/register", authController.register);
router.get("/confirm/:token", authController.activateUser);

export default router;
