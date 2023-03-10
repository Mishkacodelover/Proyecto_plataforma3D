import express from "express";
import collectionController from "../controller/collections_controller.js";

const collectionRouter = express.Router();

collectionRouter.post("/", collectionController.addCollections);

collectionRouter.get("/:id", collectionController.getCollection);

collectionRouter.patch("/:id", collectionController.updateCollection);

collectionRouter.get(
  "/all-collections/:id",
  collectionController.getAllCollections
);
collectionRouter.delete("/:id", collectionController.logicDeleteCollection);

export default collectionRouter;
