import express from "express";
import auth from "./auth";
import { passport } from "../middlewares";
const router = express.Router();

router.use("/auth", auth);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (_, res) => {
    res.send("You are authenticated");
  }
);

export default router;
