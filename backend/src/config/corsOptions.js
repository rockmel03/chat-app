import { WHITELISTED_ORIGINS } from "../constants.js";

export default {
  origin: function (origin, callback) {
    if (
      WHITELISTED_ORIGINS.indexOf(origin) !== -1 ||
      (process.env.NODE_ENV !== "production" && !origin)
    ) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  optionsSuccessStatus: 200,
  credentials: true,
};
