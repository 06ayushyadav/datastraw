const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      (error) => error.message
    );

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value already exists",
      fields: Object.keys(err.keyPattern || {})
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid data format"
    });
  }

  const statusCode =
    res.statusCode !== 200
      ? res.statusCode
      : 500;

  return res.status(statusCode).json({
    success: false,
    message:
      err.message || "Internal Server Error"
  });
};

export {
  notFound,
  errorHandler
};