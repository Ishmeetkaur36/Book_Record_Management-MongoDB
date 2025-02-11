const { UserModel, BookModel } = require("../models/index.js");
const issuedBook = require("../dtos/book-dto.js");
const IssuedBook = require("../dtos/book-dto.js");

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
  const issuedBooks = users.map((each) => new issuedBook(each));

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
};

exports.addNewBook = async (req, res) => {
  const {data} = req.body;

  if(!data){
    return res.status(400).json({
      success: false,
      message: "No Data To Add A Book"
    });
  }
    await BookModel.create(data);
    const allBooks = await BookModel.find();
    
      return res.status(201).json({
        success: true,
        message: "Added Book Successfully",
        data: allBooks,
      });
    
};

exports.updateBookById = async (req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  const updatedBook = await BookModel.findOneAndUpdate({}, data, {
    new: true,
  });
};