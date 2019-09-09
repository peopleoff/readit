const { history } = require("../models");

module.exports = {
  addHistory(saveObject) {
      history.create(saveObject);
  }
};
