const controller = require("../controllers/interaction.controller");
const { authJwt } = require("../middlewares");
const API_URL = "/api/interaction/";
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    API_URL + "create", [authJwt.verifyToken], 
    controller.create
  );
//   app.post(
//     API_URL + ":interaction_id" + "/update",
//     controller.update
//   );
  app.get(API_URL + ":customer_id", [authJwt.verifyToken], controller.get);
  app.delete(API_URL + ":interaction_id", [authJwt.verifyToken], controller.delete);
};
