import { Router } from "express";

// import { productRouter } from "./product.router";
// import { ratingRouter } from "./rating.router";
// import { servicesRouter } from "./services.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/user", userRouter);
// router.use("/product", productRouter);
// router.use("/services", servicesRouter);
// router.use("/rating", ratingRouter);

export const mainRouter = router;
