// import nanoid dari package
const { nanoid } = require("nanoid");

// import books dari books.js
const books = require("./books");

// handler Post data books
const addBooksHandler = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage; // to get boolean value
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // jika nama kosong maka Gagal menambahkan buku. Mohon isi nama buku
  const nameIsBlank = name === undefined;
  if (nameIsBlank) {
    const response = res.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  //   jika readPage lebih besar dari pageCount maka Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount
  const readPageOverSize = readPage > pageCount;
  if (readPageOverSize) {
    const response = res.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  books.push(newBooks); // push to array books

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  //   jika success maka Buku berhasil ditambahkan
  if (isSuccess) {
    const response = res.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  //   jika gagal maka Buku gagal ditambahkan
  const response = res.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// API dapat menampilkan seluruh buku
const getAllBooksHandler = (req, res) => {
  // referensi https://www.dicoding.com/academies/261/tutorials/14732
  const { name, reading, finished } = req.query;

  // filter untuk ?name
  if (name !== undefined) {
    const response = res.response({
      status: "success",
      data: {
        books: books
          .filter((books) =>
            books.name.toLowerCase().includes(name.toLowerCase())
          )
          .map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  // filter untuk ?reading
  if (reading) {
    const isReading = reading === "1";
    const response = res.response({
      status: "success",
      data: {
        books: books
          .filter((books) => books.reading === isReading)
          .map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  // filter untuk ?finished
  if (finished) {
    const isFinish = finished === "1";
    const response = res.response({
      status: "success",
      data: {
        books: books
          .filter((books) => books.finished === isFinish)
          .map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  // untuk membaca semua data buku
  if ((name, reading, finished === undefined)) {
    const response = res.response({
      status: "success",
      data: {
        books: books.map((item) => ({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};

// API dapat menampilkan detail buku
const getBooksByIdHanlder = (req, res) => {
  const { id } = req.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book != undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = res.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// API dapat mengubah data buku
const editBooksByIdHandler = (req, res) => {
  const { id } = req.params;
  //   body request
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const nameIsBlank = name === undefined;
  const readPageOverSize = readPage > pageCount;

  if (readPageOverSize) {
    // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
    const response = res.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else if (nameIsBlank) {
    // Client tidak melampirkan properti name pada request body.
    const response = res.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  //   mencari book dengan id yang akan bernilai array
  const index = books.findIndex((book) => book.id === id);

  //   menentukan success or fail
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = res.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = res.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBooksByIdHandler = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);

  // pengecekan terhadap nilai index, semoga nilainya tidak -1
  if (index !== -1) {
    books.splice(index, 1);

    const response = res.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = res.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHanlder,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
};
