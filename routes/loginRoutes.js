import express from "express";
import fs from "fs";

const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ message: "Login successful!", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
