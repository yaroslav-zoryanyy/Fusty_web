import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { updateUserSchema } from "../schemas/user.schema";

const router: Router = Router();

router.get("/all", userController.getAllUsers);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateUpdateUser(updateUserSchema),
  userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);

export const userRouter: Router = router;
