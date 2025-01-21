const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

//const BookModel = require('../models/book-model');
//const UserModel = require('../models/user-model');

const router = express.Router();

const { UserModel, BookModel } = require("../models/index.js")


//& http://localhost:8081/books

/*
 ^ Route: /books
 ^ Method: GET
 ^ Description: Get all users
 ^ Access: Public
 ^ Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/*
 ^ Route: /books/issued
 ^ Method: GET
 ^ Description: Get all issued books
 ^ Access: Public
 ^ Parameters: none
 */

router.get("/issued", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook)
      return each;
  });

  const issuedBooks = [];

  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
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
});



/*
 ^ Route: /books/:id
 ^ Method: GET
 ^ Description: Get book by id
 ^ Access: Public
 ^ Parameters: id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
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
});

/*
^ Route: /books
^ Method: POST
^ Description: Add a new Book
^ Access: Public
^ Parameters: none
*/

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "NO DATA PROVIDED TO ADD",
    });
  }

  const book = books.find((each) => each.id === id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "BOOK WITH ID ALREADY EXISTS !",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "BOOK ADDED SUCCESSFULLY !",
    data: allBooks,
  });
});

/*
^ Route: /books/update/:id
^ Method: PUT
^ Description: Update Book by id
^ Access: Public
^ Parameters: id
*/
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "NO BOOK FOUND FOR THIS ID",
    });
  }
  const updateBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      }
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "BOOK INFORMATION UPDATED SUCCESSFULLY !",
    data: updateBookData,
  });
});

module.exports = router;