import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";
import { updateUserSchema } from "../schemas/user.schema";

const router = Router();

router.get("/all", userController.getAllUsers);
// router.post(
//   "/create",
//   commonMiddleware.validateBody(createUserSchema),
//   commonMiddleware.checkPhoneExists(),
//   userController.createUser,
// );
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.validateUpdateUser(updateUserSchema),
  userController.updateUser,
);

export const userRouter = router;
