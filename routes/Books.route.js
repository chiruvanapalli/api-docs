const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const BookModel = require("../models/Book.model");
const {
  createBookValidation,
  updateBookValidation,
  handleValidationErrors,
} = require("../validators/book.validator");

router.post(
  "/",
  createBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).json({ data: newBook });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json({ data: books });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ data: book });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put(
  "/:id",
  updateBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const updateProduct = await BookModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: 'after' },
      );
      if (!updateProduct) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ data: updateProduct });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
);

router.delete("/:id", async (req, res) => {
  try {
    const deleteBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
