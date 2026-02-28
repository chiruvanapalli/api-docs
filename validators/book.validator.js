const { body, validationResult, param } = require("express-validator");

const createBookValidation = [
  body("bookName")
    .notEmpty()
    .withMessage("Book name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Book name must be between 5 and 100 characters"),
  body("countInStock")
    .notEmpty()
    .withMessage("Stock count is required")
    .isInt({ min: 1, max: 100 })
    .withMessage("Stock count must be an integer between 1 and 100"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1, max: 100 })
    .withMessage("Price must be an integer between 1 and 100"),
  body("image")
    .notEmpty()
    .withMessage("Image URL is required")
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/)
    .withMessage("Please enter a valid image URL"),
];

const updateBookValidation = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("bookName")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("Book name must be between 5 and 100 characters"),
  body("countInStock")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Stock count must be an integer between 1 and 100"),
  body("price")
    .optional()
    .isFloat({ min: 1, max: 100 })
    .withMessage("Price must be an integer between 1 and 100"),
  body("image")
    .optional()
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/)
    .withMessage("Please enter a valid image URL"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createBookValidation,
  updateBookValidation,
  handleValidationErrors,
};
