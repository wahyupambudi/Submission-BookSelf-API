const { addBooksHandler, getAllBooksHandler, getBooksByIdHanlder } = require("./handler");

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
  },
  {
      method: "GET",
      path: "/books/{id}",
      handler: getBooksByIdHanlder,
  }
];

// melakukan exports routes
module.exports = routes;
