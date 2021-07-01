const { addBooksHandler, getAllBooksHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  {
      method: "GET",
      path: "/books",
      handler: getAllBooksHandler,
  }
];

// melakukan exports routes
module.exports = routes;
