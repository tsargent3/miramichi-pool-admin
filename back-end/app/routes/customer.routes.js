const controller = require("../controllers/customer.controller");
const { authJwt } = require("../middlewares");
const API_URL = "/api/customer/";
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
  app.post(
    API_URL + ":customer_id" + "/update", [authJwt.verifyToken],
    controller.update
  );
  app.post(
    API_URL + ":customer_id" + "/status-update", [authJwt.verifyToken],
    controller.updateStatus
  );
  app.post(
    API_URL + ":customer_id" + "/notify-update", [authJwt.verifyToken], 
    controller.notifyUpdate
  );
  app.get(API_URL + ":customer_id", [authJwt.verifyToken], controller.get);
  app.get(API_URL, [authJwt.verifyToken], controller.getAll);
  app.delete(API_URL + ":customer_id", [authJwt.verifyToken], controller.delete);
};
