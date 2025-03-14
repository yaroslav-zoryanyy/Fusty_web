import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.post("/registration", userController.create);
router.post("/login", userController.login);
router.get("/auth", userController.check);
// router.delete("/",)
// router.put("/",)

export const userRouter = router;
