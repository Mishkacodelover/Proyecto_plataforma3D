import express from "express";
import collectionController from "../controller/collections_controller.js";

const collectionRouter = express.Router();

collectionRouter.post("/", collectionController.addCollections);

collectionRouter.get("/collection", collectionController.getCollection);

collectionRouter.get(
  "/all-collections",
  collectionController.getAllCollections
);

export default collectionRouter;