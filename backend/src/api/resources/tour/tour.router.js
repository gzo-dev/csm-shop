import express from "express"
import tourController from "./tour.controller";
import authenticateJWT from "../../../middleware/verify_token";


export const tourRouter = express.Router();

tourRouter.post("/", tourController.addTour)
tourRouter.put("/", authenticateJWT, tourController.updateTour)
tourRouter.get("/s/t", tourController.getListSuggestTour)
tourRouter.get("/", tourController.getListTour)
tourRouter.get("/manage", authenticateJWT, tourController.getListTour)
tourRouter.get("/c", tourController.getListTourCategory)
tourRouter.get("/d", tourController.getTourDetail)
tourRouter.get("/d/c", tourController.getTourDetailClient)
tourRouter.get("/serverside/d", tourController.getTourDetailServerside)
tourRouter.get("/detail", tourController.getTourDetail)
tourRouter.get("/history/edit", authenticateJWT, tourController.getHistoryEditProduct)
tourRouter.delete("/", tourController.deleteTour)