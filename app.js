require("express-async-errors");
require("dotenv").config();
const NotFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const { createApp } = require("./crud-generator");
const {VerifyToken} = require('./middlewares/auth')
//Models For Generating through sequalize
const user = require("./models/user");
const role = require("./models/role");

const sequelize = require("./utils/database");
const { StatusCodes } = require("http-status-codes");
const getMsg = require("./utils/get-msg");
const fileUpload = require("./middlewares/file-upload");
const {app, createRoute } = createApp(sequelize);

app.get('/',(__,res) => res.status(StatusCodes.ACCEPTED).json({success : true,msg : 'Crud Generator API'}))

// app.use(VerifyToken)
// use for authentication


createRoute("roles", role, {
  onDelete: (req) =>
    user
      .destroy({ where: { role: req.params.id } })
      .then((res) =>
        console.log("res --", res).catch((err) => ("err --", err.response))
      ),
});

createRoute("users",user,{
},{
  onPost : fileUpload('image','users',["png", "jpg","jpeg"])
//   (req,res,next) => {
//   req.body.i = 999;
//   console.log(req.body);
//   next();
//   res.json({msg : getMsg('Balls')('get')})
// }
})


// sequelize.sync({ force: true , alter : true})



app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT,()=>console.log(`Server is running on PORT : ${process.env.PORT}`));
