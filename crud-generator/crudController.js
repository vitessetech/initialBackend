const { createCustomAPIError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const crudController = (
  modelName,
  Model,
  sequelize,
  {
    onDelete = () => {},
    onGetAll = () => {},
    onGetSingle = () => {},
    onPost = () => {},
    onPut = () => {},
    onPatch = () => {},
  }
) => {
// utils-start
function getMsg(c) {
  const name = `${modelName[0].toLocaleUpperCase() + modelName.slice(1).slice(0,-1)}`
  switch(c) {
    case 'post' : return `${name} Added`
    case 'get' : return `${name} List Fetched`
    case 'get-single' : return `${name} fetched`
    case 'put' : return `${name} Updated`
    case 'delete' : return `${name} Deleted`
    case '404' : return `${name} Not Found`
  }
}
// utils-end

  const GetAll = async (req, res) => {
    await onGetAll(req);
    const all = await Model.findAll();
    res.status(StatusCodes.OK).json({ data: all, sucess: true, msg : getMsg('get') });
  };

  const GetSingle = async (req, res, sendJSON = true) => {
    await onGetSingle(req);
    const model = await Model.findOne({ where: { id: req.params.id } });
    if (!model) {
      throw createCustomAPIError(StatusCodes.NOT_FOUND, getMsg('404'));
    }

    if (sendJSON)
      res.status(StatusCodes.OK).json({ data: model, sucess: true , msg : getMsg('get-single')});
    return model;
  };

  const Post = async (req, res) => {
    await onPost(req);
    const model = await Model.create(req.body);
    console.log(req.body);
    res.status(StatusCodes.CREATED).json({ data: model, sucess: true ,msg : getMsg('post')});
  };
  const Put = async (req, res) => {
    await onPut(req);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!existModel) throw Error(getMsg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: existModel, sucess: true ,msg : getMsg('put')});
  };

  const Patch = async (req, res) => {
    await onPatch(req);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!existModel) throw Error(getMsg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: existModel, sucess: true ,msg : getMsg('put')});
  };

 

  const Delete = async (req, res) => {
    await onDelete(req);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.destroy({ where: { id: req.params.id } });
    if (!existModel) throw Error(getMsg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: existModel, sucess: true,msg : getMsg('delete') });
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

