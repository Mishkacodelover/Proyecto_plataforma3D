import express from "express";
import imagesController from "../controller/images_controller.js";

const imagesRouter = express.Router();

imagesRouter.post("/upload", imagesController.uploadImage);

imagesRouter.get("/image/:id", imagesController.getImage);

export default imagesRouter;
