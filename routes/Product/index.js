import { Router } from "express";
const router = Router();

import { productController } from "../../controller";

router.get("/login", productController.home);

export default router;
