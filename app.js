require("express-async-errors");
require("dotenv").config();
const express = require("express");
const NotFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const { createApp } = require("./crud-generator");

//Models For Generating through sequalize
const user = require("./models/user");
const role = require("./models/role");

const sequelize = require("./utils/database");
const {app, createRoute } = createApp(sequelize);

createRoute("roles", role, {
  onDelete: (req) =>
    user
      .destroy({ where: { role: req.params.id } })
      .then((res) =>
        console.log("res --", res).catch((err) => ("err --", err.response))
      ),
});
createRoute("users",user)


// sequelize.sync({ force: true })



app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT,()=>console.log(`Server is running on PORT : ${process.env.PORT}`));
