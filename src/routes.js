const { addBooksHandler, getAllBooksHandler, getBooksByIdHanlder, editBooksByIdHandler } = require("./handler");

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
  },
  {
      method: "PUT",
      path: "/books/{id}",
      handler: editBooksByIdHandler
  }
];

// melakukan exports routes
module.exports = routes;
