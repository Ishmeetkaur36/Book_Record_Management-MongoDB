const { UserModel, BookModel } = require("../models/index.js");

//const getAllBooks = () => {};
exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      messgae: "No Book Found",
    });
  }
  res.status(200).json({
    succes: true,
    data: books,
  });
};

//const getSingleBookById = () => {};
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "BOOK NOT FOUND"
    });
  }
  return res.status(200).json({
    success: true,
    message: "BOOK FOUND",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true }
  }).populate("issuedBook");

  //Data Tranfer objects
  //const issuedBooks = users.map((each) => new issuedBook(each))
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "NO BOOKS HAVE BEEN ISSUED YET",
    });
  }
  return res.status(200).json({
    success: true,
    message: "USERS WITH ISSUED BOOKS",
    data: issuedBooks,
  });
}

