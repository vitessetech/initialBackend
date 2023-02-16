const express = require("express");
const cors = require("cors");

const generateAuthToken = require('../utils/generate-auth-token')

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const defaultMiddleware = (req,res,next)=>{next()}

const createApp = (sequelize = null) => {
  if (!sequelize) throw Error("please pass sequelize in createApp function.");

  const app = express();
  app.use(express.json());
  app.use(cors(corsOptions));

  const createRoute = (modelName, model, crudFuncs = {},
    middlewares = {
      onGetAll : defaultMiddleware,
      onGetSingle : defaultMiddleware,
      onPost : defaultMiddleware,
      onPut : defaultMiddleware,
      onPatch : defaultMiddleware,
      onDelete : defaultMiddleware,
    }) => {
    const router = express.Router();
    const baseUrl = "/api/v1/" + modelName;
   

    const { GetAll, GetSingle, Post, Patch, Put, Delete } =
      require("../crud-generator/crudController")(
        modelName,
        model,
        crudFuncs
      );
    
      const {
        onGetAll,
        onGetSingle,
        onPost,
        onPut,
        onPatch,
        onDelete,
      } =   middlewares;
      
    router.route("/")
    .get(onGetAll || defaultMiddleware, GetAll)
    .post(onPost || defaultMiddleware, Post);

    router.route("/:id")
    .get(onGetSingle || defaultMiddleware, GetSingle)
    .patch(onPatch || defaultMiddleware, Patch)
    .put(onPut || defaultMiddleware, Put)
    .delete(onDelete || defaultMiddleware, Delete);

    app.use(baseUrl, router);
  };

  return { app, createRoute,generateAuthToken };
};
module.exports = { createApp };
