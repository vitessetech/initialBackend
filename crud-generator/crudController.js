const { createCustomAPIError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const getMsg = require("../utils/get-msg");
const crudController = (
  modelName,
  Model,
  {
    onDelete = () => {},
    onGetAll = () => {},
    onGetSingle = () => {},
    onPost = () => {},
    onPut = () => {},
    onPatch = () => {},
  }
) => {

const responseMsg = getMsg(modelName);

  const GetAll = async (req, res) => {
    await onGetAll(req,res);
    const all = await Model.findAll({where : req.query});
    res.status(StatusCodes.OK).json({ data: all, sucess: true, msg : responseMsg('get') });
  };

  const GetSingle = async (req, res, sendJSON = true) => {
    await onGetSingle(req,res);
    const model = await Model.findOne({ where: { id: req.params.id } });
    if (!model) {
      throw createCustomAPIError(StatusCodes.NOT_FOUND, responseMsg('404'));
    }

    if (sendJSON)
      res.status(StatusCodes.OK).json({ data: model, sucess: true , msg : responseMsg('get-single')});
    return model;
  };

  const Post = async (req, res) => {
    await onPost(req,res);
    const model = await Model.create(req.body);
    console.log(req.body);
    res.status(StatusCodes.CREATED).json({ data: model, sucess: true ,msg : responseMsg('post')});
  };
  const Put = async (req, res) => {
    await onPut(req,res);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!existModel) throw Error(responseMsg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: await GetSingle(req,res), sucess: true ,msg : responseMsg('put')});
  };

  const Patch = async (req, res) => {
    await onPatch(req,res);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!existModel) throw Error(responseMsg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: await GetSingle(req,res), sucess: true ,msg : responseMsg('put')});
  };

  const Delete = async (req, res) => {
    await onDelete(req,res);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.destroy({ where: { id: req.params.id } });
    if (!existModel) throw Error(responseMsg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: existModel, sucess: true,msg : responseMsg('delete') });
  };

  return {
    GetAll,
    GetSingle,
    Post,
    Patch,
    Put,
    Delete,
  };
};

module.exports = crudController;

