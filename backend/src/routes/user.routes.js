import { Router } from "express";
import { body } from "express-validator";

import * as userController from "../controllers/user.controllers.js";

const router = Router();

router.post(
  "/register",
  [
    body("username")
      .isString()
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("username must 4-5 character long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isString()
      .trim()
      .isStrongPassword()
      .withMessage("password must be strong"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("user").isString().trim().withMessage("invalid user "),
    body("password").isString().trim().withMessage("invalid password"),
  ],
  userController.loginUser
);

router.get(
  "/refresh",
  body("refreshToken")
    .optional()
    .isJWT()
    .withMessage("refreshToken must be a JWT token"),
  userController.refreshAuthTokens
);

router.get("/logout", userController.logoutUser);

export default router;
