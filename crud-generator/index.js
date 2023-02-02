const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
let models = {};

const createApp = (sequelize = null) => {
  if (!sequelize) throw Error("please pass sequelize in createApp function.");

  const app = express();
  app.use(express.json());
  app.use(cors(corsOptions));

  const createRoute = (modelName, model, crudFuncs = {}) => {
    const router = express.Router();
    const baseUrl = "/api/v1/" + modelName;

    let Models = null;
    if (!model) {
      Models = models[modelName];
    }

    const { GetAll, GetSingle, Post, Patch, Put, Delete } =
      require("../crud-generator/crudController")(
        modelName,
        model || Models,
        sequelize,
        crudFuncs
      );

    router.route("/").get(GetAll).post(Post);
    router.route("/:id").get(GetSingle).patch(Patch).put(Put).delete(Delete);

    app.use(baseUrl, router);
  };

  return { app, createRoute };
};
module.exports = { createApp };
