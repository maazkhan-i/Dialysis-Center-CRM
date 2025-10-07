import express from "express";
import loginRoutes from "./routes/loginRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

const app = express();
// middleware:
app.use(express.json());

//can be replace api to dialysiscenter
app.use("/api", loginRoutes);
// app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
