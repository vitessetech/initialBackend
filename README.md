# initialBackend
This is Initial Setup for Backend Node Application, just clone it and use it ;)

-No need to make controllers and routes
-Pass slug and model to createRoute method, it perform CRUD opreations on that model.

# NeedToKnow

- Setup utils DB and password.
- .env included PORT = 5000.
- Do not change dependencies version, it will maybe cause bugs.
- Node version : 16.16.
- After running server make sync false : sequelize.sync({ force: false }).
- In Beta version, there is you can add only one middleware from props.


#Upcoming Features

- No need to pass separate two props for pre-methods and middlewares.
- base Url and cors configuration
- pass customReq like onGetList
- use bycrypt for password
