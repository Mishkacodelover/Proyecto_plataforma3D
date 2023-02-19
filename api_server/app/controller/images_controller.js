import { currentDir } from "../index.js";
import dao from "../services/dao.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;

    images.forEach(async (image) => {
      let uploadPath = __dirname + "/public/images/products/" + image.name;
      let BBDDPath = "images/products/" + image.name;
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addImage({
        name: image.name,
        path: BBDDPath,
      });
    });

    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    const image = await dao.getImageById(req.params.id);

    if (image.length <= 0) return res.status(404).send("La imagen no existe");

    return res.sendFile(image[0].path, { root: __dirname });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getAllImages = async (req, res) => {
  try {
    const resources = await dao.getAllImages();

    if (resources.length <= 0)
      return res.status(404).send("No existen recursos gráficos");

    return res.send(resources);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
