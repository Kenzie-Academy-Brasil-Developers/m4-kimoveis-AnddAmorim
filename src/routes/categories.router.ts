import {Router} from "express";
import {
  createCategoryController,
  readCategoriesController,
  readRealEstateByCategoryController,
} from "../controller/categories.controller";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import {createCategorySchema} from "../schemas/categories.schema";
import {
  verifyCategoryExists,
  verifyUniqueCategory,
} from "../middlewares/categories.middleware";

export const categoryRouter: Router = Router();

categoryRouter.post(
  "/",
  validateBody(createCategorySchema),
  verifyToken,
  verifyUniqueCategory,
  verifyAdmin,
  createCategoryController
);

categoryRouter.get("/", readCategoriesController);

categoryRouter.get(
  "/:id/realEstate",
  verifyCategoryExists,
  readRealEstateByCategoryController
);
