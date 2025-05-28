import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

//реєстрація
router.post(
  "/sign-up",
  commonMiddleware.validateBody(UserValidator.create),
  commonMiddleware.checkPhoneExists(),
  authController.signUp,
);

//увійти
router.post(
  "/sign-in",
  commonMiddleware.validateBody(UserValidator.login),
  commonMiddleware.checkPhoneNotExists(),
  authController.signIn,
);

//Заміна токену
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
