import ApiError from "./ApiError.js";

export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...err,
    });
  }

  // Handle other unexpected errors
  res.status(500).json({ message: "Internal server error" });
}
