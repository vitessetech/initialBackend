const express = require("express");

const createRoute = (modelName, model) => {
  const router = express.Router();
  const baseUrl = "/api/v1/" + modelName;
  const { GetAll, GetSingle, Post, Patch, Put, Delete } =
    require("../crud-generator/crudController")(modelName, model);

  router.route("/").get(GetAll);
  router
    .route("/:id")
    .get(GetSingle)
    .post(Post)
    .patch(Patch)
    .put(Put)
    .delete(Delete);

  //   app.use(baseUrl, router);
  return router;
};

module.exports = createRoute;
