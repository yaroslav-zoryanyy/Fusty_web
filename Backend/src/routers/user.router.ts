import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/all", userController.getAllUsers);
router.post("/create", userController.createUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

export const userRouter = router;
