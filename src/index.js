import express from "express";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
// console.log({PORT})

//routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
