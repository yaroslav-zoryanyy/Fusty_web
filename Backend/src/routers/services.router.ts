import { Router } from "express";

import { servicesController } from "../controllers/services.controller";

const router = Router();

router.get("/all", servicesController.getAllServices);
router.post("/create", servicesController.createServices);
router.get("/:id", servicesController.getServicesById);
router.delete("/:id", servicesController.deleteServices);
router.put("/:id", servicesController.updateServices);

export const servicesRouter = router;
