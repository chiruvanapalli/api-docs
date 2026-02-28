const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: [true, "Book name is required"],
      minLength: [8, "Book name should be at least 3 characters"],
      maxLength: [100, "Book name should be less than 5 characters"],
      trim: true,
    },
    countInStock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [1, "Stock count should be at least 1"],
      max: [100, "Stock count should be less than 100"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [50, "Price should be at least 50"],
      max: [100, "Price should be less than 100"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      validate: {
        validator: (value) => {
          if (
            !value.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/)
          ) {
            return false;
          }
        },
        message: "Please enter a valid image URL",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", BookSchema);
